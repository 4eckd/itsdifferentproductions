#!/bin/bash

# Automated Documentation Site Deployment Script
# This script deploys docs.itsdifferentproductions.com with DNS configuration

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$PROJECT_ROOT/docs"
LOG_FILE="$PROJECT_ROOT/logs/deployment.log"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_ROOT/logs"

# Logging function
log() {
    local level=$1
    shift
    local message="$@"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "${timestamp} [${level}] ${message}" | tee -a "$LOG_FILE"
}

# Print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
    log "INFO" "$message"
}

# Error handling
handle_error() {
    print_status "$RED" "❌ Error occurred in deployment script"
    log "ERROR" "Deployment failed at line $1"
    exit 1
}

trap 'handle_error $LINENO' ERR

# Check prerequisites
check_prerequisites() {
    print_status "$BLUE" "🔍 Checking prerequisites..."

    # Check if required commands exist
    local required_commands=("node" "npm" "git" "curl")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            print_status "$RED" "❌ Required command '$cmd' not found"
            exit 1
        fi
    done

    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        print_status "$YELLOW" "⚠️  Vercel CLI not found. Installing..."
        npm install -g vercel
    fi

    # Check if environment file exists
    if [[ ! -f "$PROJECT_ROOT/.env.local" ]]; then
        print_status "$YELLOW" "⚠️  .env.local file not found. Creating from example..."
        cp "$PROJECT_ROOT/.env.local.example" "$PROJECT_ROOT/.env.local"
        print_status "$YELLOW" "📝 Please edit .env.local with your actual values before continuing"
        exit 1
    fi

    print_status "$GREEN" "✅ Prerequisites check completed"
}

# Load environment variables
load_environment() {
    print_status "$BLUE" "📋 Loading environment variables..."

    if [[ -f "$PROJECT_ROOT/.env.local" ]]; then
        export $(cat "$PROJECT_ROOT/.env.local" | grep -v '^#' | xargs)
        print_status "$GREEN" "✅ Environment variables loaded"
    else
        print_status "$RED" "❌ .env.local file not found"
        exit 1
    fi
}

# Validate environment variables
validate_environment() {
    print_status "$BLUE" "🔐 Validating environment variables..."

    local required_vars=("VERCEL_TOKEN" "DOMAIN" "DOCS_SUBDOMAIN")
    for var in "${required_vars[@]}"; do
        if [[ -z "${!var}" ]]; then
            print_status "$RED" "❌ Required environment variable $var is not set"
            exit 1
        fi
    done

    # Validate DNS provider specific requirements
    if [[ "$DNS_PROVIDER" == "cloudflare" ]]; then
        local cloudflare_vars=("CLOUDFLARE_EMAIL" "CLOUDFLARE_API_KEY")
        for var in "${cloudflare_vars[@]}"; do
            if [[ -z "${!var}" ]]; then
                print_status "$RED" "❌ Required Cloudflare variable $var is not set"
                exit 1
            fi
        done
    fi

    print_status "$GREEN" "✅ Environment validation completed"
}

# Setup Vercel project
setup_vercel_project() {
    print_status "$BLUE" "🚀 Setting up Vercel project..."

    cd "$DOCS_DIR"

    # Login to Vercel
    echo "$VERCEL_TOKEN" | vercel login --token

    # Link or create project
    if [[ -z "$VERCEL_DOCS_PROJECT_ID" ]]; then
        print_status "$YELLOW" "📝 Creating new Vercel project..."
        vercel --confirm --token "$VERCEL_TOKEN"
    else
        print_status "$BLUE" "🔗 Linking to existing Vercel project..."
        vercel link --token "$VERCEL_TOKEN" --yes
    fi

    print_status "$GREEN" "✅ Vercel project setup completed"
}

# Configure DNS
configure_dns() {
    print_status "$BLUE" "🌐 Configuring DNS..."

    cd "$PROJECT_ROOT"

    # Run DNS configuration script
    node scripts/setup-docs-dns.js

    print_status "$GREEN" "✅ DNS configuration completed"
}

# Build documentation
build_docs() {
    print_status "$BLUE" "🔨 Building documentation..."

    cd "$PROJECT_ROOT"

    # Install dependencies if needed
    if [[ ! -d "node_modules" ]]; then
        print_status "$BLUE" "📦 Installing dependencies..."
        npm install
    fi

    # Build documentation (if you have a build process)
    if [[ -f "package.json" ]] && grep -q "docs:build" package.json; then
        npm run docs:build
    fi

    print_status "$GREEN" "✅ Documentation build completed"
}

# Deploy to Vercel
deploy_to_vercel() {
    print_status "$BLUE" "🚀 Deploying to Vercel..."

    cd "$DOCS_DIR"

    # Deploy to production
    vercel --prod --token "$VERCEL_TOKEN" --confirm

    print_status "$GREEN" "✅ Deployment to Vercel completed"
}

# Configure custom domain
configure_domain() {
    print_status "$BLUE" "🌍 Configuring custom domain..."

    local full_domain="${DOCS_SUBDOMAIN}.${DOMAIN}"

    # Add domain to Vercel project
    vercel domains add "$full_domain" --token "$VERCEL_TOKEN" || true

    print_status "$GREEN" "✅ Domain configuration completed"
}

# Verify deployment
verify_deployment() {
    print_status "$BLUE" "🔍 Verifying deployment..."

    local full_domain="${DOCS_SUBDOMAIN}.${DOMAIN}"
    local max_attempts=10
    local attempt=1

    while [[ $attempt -le $max_attempts ]]; do
        print_status "$BLUE" "🔄 Attempt $attempt/$max_attempts: Checking https://$full_domain"

        if curl -s -o /dev/null -w "%{http_code}" "https://$full_domain" | grep -q "200\|301\|302"; then
            print_status "$GREEN" "✅ Deployment verification successful!"
            print_status "$GREEN" "🌐 Documentation site is live at: https://$full_domain"
            return 0
        fi

        print_status "$YELLOW" "⏳ Waiting for DNS propagation... (attempt $attempt/$max_attempts)"
        sleep 30
        ((attempt++))
    done

    print_status "$YELLOW" "⚠️  Verification timed out. The site may still be propagating."
    print_status "$BLUE" "🔗 Check manually at: https://$full_domain"
}

# Send notifications
send_notifications() {
    print_status "$BLUE" "📢 Sending notifications..."

    local full_domain="${SUBDOMAIN}.${DOMAIN}"
    local message="📚 Documentation site deployed successfully!\n🌐 URL: https://$full_domain\n⏰ Time: $(date)"

    # Slack notification
    if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$message\"}" \
            "$SLACK_WEBHOOK_URL" || true
    fi

    # Discord notification
    if [[ -n "$DISCORD_WEBHOOK_URL" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"content\":\"$message\"}" \
            "$DISCORD_WEBHOOK_URL" || true
    fi

    print_status "$GREEN" "✅ Notifications sent"
}

# Cleanup function
cleanup() {
    print_status "$BLUE" "🧹 Cleaning up..."

    # Remove temporary files if any
    rm -f "$PROJECT_ROOT/temp_*" 2>/dev/null || true

    print_status "$GREEN" "✅ Cleanup completed"
}

# Main deployment function
main() {
    print_status "$GREEN" "🚀 Starting documentation site deployment..."
    print_status "$BLUE" "📅 Deployment started at: $(date)"

    # Run deployment steps
    check_prerequisites
    load_environment
    validate_environment
    setup_vercel_project
    configure_dns
    build_docs
    deploy_to_vercel
    configure_domain
    verify_deployment
    send_notifications
    cleanup

    print_status "$GREEN" "🎉 Documentation site deployment completed successfully!"
    print_status "$GREEN" "🌐 Your documentation is now live at: https://${SUBDOMAIN}.${DOMAIN}"
    print_status "$BLUE" "📅 Deployment completed at: $(date)"

    # Display summary
    echo ""
    print_status "$BLUE" "📋 DEPLOYMENT SUMMARY"
    echo "=================================="
    echo "Domain: https://${SUBDOMAIN}.${DOMAIN}"
    echo "DNS Provider: ${DNS_PROVIDER}"
    echo "Vercel Project: ${VERCEL_PROJECT_ID:-'Auto-created'}"
    echo "Log File: $LOG_FILE"
    echo "=================================="
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [options]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --dry-run      Show what would be done without executing"
        echo "  --force        Force deployment even if checks fail"
        echo ""
        echo "Environment:"
        echo "  Copy .env.dns.example to .env.dns and configure your values"
        echo ""
        exit 0
        ;;
    --dry-run)
        print_status "$YELLOW" "🔍 DRY RUN MODE - No changes will be made"
        print_status "$BLUE" "Would deploy docs.itsdifferentproductions.com"
        exit 0
        ;;
    --force)
        print_status "$YELLOW" "⚠️  FORCE MODE - Skipping some safety checks"
        export FORCE_DEPLOY=true
        ;;
esac

# Run main function
main "$@"
