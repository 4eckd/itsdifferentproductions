#!/bin/bash

# Quick Setup Script for docs.itsdifferentproductions.com
# This script automates the entire DNS and deployment process

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Print banner
print_banner() {
    echo -e "${PURPLE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║        📚 Its Different Productions Documentation Setup      ║"
    echo "║                                                              ║"
    echo "║              Automated DNS & Deployment Script              ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Print step
print_step() {
    echo -e "${BLUE}🔄 $1${NC}"
}

# Print success
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Print warning
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Print error
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if running on supported OS
check_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]] || [[ "$OSTYPE" == "darwin"* ]]; then
        print_success "Operating system supported: $OSTYPE"
    else
        print_error "Unsupported operating system: $OSTYPE"
        echo "This script supports Linux and macOS only."
        exit 1
    fi
}

# Check prerequisites
check_prerequisites() {
    print_step "Checking prerequisites..."

    local missing_deps=()

    # Check required commands
    local required_commands=("node" "npm" "git" "curl" "bc")
    for cmd in "${required_commands[@]}"; do
        if ! command -v "$cmd" &> /dev/null; then
            missing_deps+=("$cmd")
        fi
    done

    if [[ ${#missing_deps[@]} -gt 0 ]]; then
        print_error "Missing required dependencies: ${missing_deps[*]}"
        echo ""
        echo "Please install the missing dependencies:"
        echo ""
        if [[ "$OSTYPE" == "darwin"* ]]; then
            echo "  # macOS (using Homebrew)"
            echo "  brew install node git curl bc"
        else
            echo "  # Ubuntu/Debian"
            echo "  sudo apt update && sudo apt install nodejs npm git curl bc"
            echo ""
            echo "  # CentOS/RHEL"
            echo "  sudo yum install nodejs npm git curl bc"
        fi
        exit 1
    fi

    print_success "All prerequisites are installed"
}

# Install Vercel CLI if needed
install_vercel_cli() {
    if ! command -v vercel &> /dev/null; then
        print_step "Installing Vercel CLI..."
        npm install -g vercel
        print_success "Vercel CLI installed"
    else
        print_success "Vercel CLI already installed"
    fi
}

# Collect user configuration
collect_configuration() {
    print_step "Collecting configuration..."
    echo ""

    # Vercel Token
    if [[ -z "$VERCEL_TOKEN" ]]; then
        echo -e "${YELLOW}📝 You need a Vercel token to deploy the documentation site.${NC}"
        echo "   Get your token from: https://vercel.com/account/tokens"
        echo ""
        read -p "Enter your Vercel token: " VERCEL_TOKEN

        if [[ -z "$VERCEL_TOKEN" ]]; then
            print_error "Vercel token is required"
            exit 1
        fi
    fi

    # DNS Provider
    echo ""
    echo -e "${YELLOW}🌐 Choose your DNS provider:${NC}"
    echo "1) Vercel (Recommended - automatic setup)"
    echo "2) Cloudflare"
    echo "3) Namecheap"
    echo "4) Other (manual setup required)"
    echo ""
    read -p "Enter your choice (1-4): " dns_choice

    case $dns_choice in
        1) DNS_PROVIDER="vercel" ;;
        2) DNS_PROVIDER="cloudflare" ;;
        3) DNS_PROVIDER="namecheap" ;;
        4) DNS_PROVIDER="manual" ;;
        *)
            print_warning "Invalid choice, defaulting to Vercel"
            DNS_PROVIDER="vercel"
            ;;
    esac

    # Documentation deployment strategy
    echo ""
    echo -e "${YELLOW}📚 Choose documentation deployment strategy:${NC}"
    echo "1) Single branch (deploy from main branch)"
    echo "2) Docs branch (separate branch for documentation)"
    echo ""
    read -p "Enter your choice (1-2): " docs_strategy

    case $docs_strategy in
        1)
            DOCS_DEPLOYMENT_TYPE="single"
            DOCS_VERCEL_CONFIG="vercel.json"
            ;;
        2)
            DOCS_DEPLOYMENT_TYPE="branch"
            DOCS_VERCEL_CONFIG="vercel-docs.json"
            ;;
        *)
            print_warning "Invalid choice, defaulting to single branch"
            DOCS_DEPLOYMENT_TYPE="single"
            DOCS_VERCEL_CONFIG="vercel.json"
            ;;
    esac

    # Cloudflare configuration
    if [[ "$DNS_PROVIDER" == "cloudflare" ]]; then
        echo ""
        echo -e "${YELLOW}☁️  Cloudflare Configuration:${NC}"
        read -p "Enter your Cloudflare email: " CLOUDFLARE_EMAIL
        read -p "Enter your Cloudflare API key: " CLOUDFLARE_API_KEY
        read -p "Enter your Cloudflare Zone ID (optional): " CLOUDFLARE_ZONE_ID
    fi

    # Notification settings
    echo ""
    echo -e "${YELLOW}📢 Notification Settings (optional):${NC}"
    read -p "Discord webhook URL (optional): " DISCORD_WEBHOOK_URL
    read -p "Slack webhook URL (optional): " SLACK_WEBHOOK_URL

    print_success "Configuration collected"
}

# Create environment file
create_environment_file() {
    print_step "Creating environment configuration..."

    # Check if .env.local already exists
    if [[ -f ".env.local" ]]; then
        print_warning ".env.local already exists. Creating backup..."
        cp .env.local .env.local.backup.$(date +%Y%m%d_%H%M%S)
    fi

    # Copy from example and update with user values
    cp .env.local.example .env.local

    # Update specific values
    sed -i.bak "s/VERCEL_TOKEN=.*/VERCEL_TOKEN=$VERCEL_TOKEN/" .env.local
    sed -i.bak "s/DNS_PROVIDER=.*/DNS_PROVIDER=$DNS_PROVIDER/" .env.local

    if [[ -n "$CLOUDFLARE_EMAIL" ]]; then
        sed -i.bak "s/CLOUDFLARE_EMAIL=.*/CLOUDFLARE_EMAIL=$CLOUDFLARE_EMAIL/" .env.local
    fi

    if [[ -n "$CLOUDFLARE_API_KEY" ]]; then
        sed -i.bak "s/CLOUDFLARE_API_KEY=.*/CLOUDFLARE_API_KEY=$CLOUDFLARE_API_KEY/" .env.local
    fi

    if [[ -n "$CLOUDFLARE_ZONE_ID" ]]; then
        sed -i.bak "s/CLOUDFLARE_ZONE_ID=.*/CLOUDFLARE_ZONE_ID=$CLOUDFLARE_ZONE_ID/" .env.local
    fi

    if [[ -n "$DISCORD_WEBHOOK_URL" ]]; then
        sed -i.bak "s|DISCORD_WEBHOOK_URL=.*|DISCORD_WEBHOOK_URL=$DISCORD_WEBHOOK_URL|" .env.local
    fi

    if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
        sed -i.bak "s|SLACK_WEBHOOK_URL=.*|SLACK_WEBHOOK_URL=$SLACK_WEBHOOK_URL|" .env.local
    fi

    # Update docs deployment strategy
    sed -i.bak "s/DOCS_DEPLOYMENT_TYPE=.*/DOCS_DEPLOYMENT_TYPE=$DOCS_DEPLOYMENT_TYPE/" .env.local
    sed -i.bak "s/DOCS_VERCEL_CONFIG=.*/DOCS_VERCEL_CONFIG=$DOCS_VERCEL_CONFIG/" .env.local

    # Remove backup file
    rm -f .env.local.bak

    print_success "Environment file created: .env.local"
    print_warning "Please review and update .env.local with your Supabase credentials"
}

# Make scripts executable
setup_scripts() {
    print_step "Setting up deployment scripts..."

    chmod +x scripts/deploy-docs.sh
    chmod +x scripts/setup-docs-dns.js
    chmod +x scripts/setup-docs-branch.sh
    chmod +x scripts/docs-branch-manager.sh
    chmod +x scripts/validate-env.js

    print_success "Scripts are now executable"
}

# Setup docs branch if selected
setup_docs_branch() {
    if [[ "$DOCS_DEPLOYMENT_TYPE" == "branch" ]]; then
        print_step "Setting up documentation branch..."

        echo ""
        echo -e "${YELLOW}📚 You selected docs branch deployment strategy.${NC}"
        echo "This will create a separate 'docs' branch for documentation deployment."
        echo ""
        read -p "Set up docs branch now? (Y/n): " setup_branch

        if [[ "$setup_branch" != "n" && "$setup_branch" != "N" ]]; then
            ./scripts/setup-docs-branch.sh
            print_success "Docs branch setup completed"
        else
            print_warning "Docs branch setup skipped. Run './scripts/setup-docs-branch.sh' later."
        fi
    fi
}

# Run the deployment
run_deployment() {
    print_step "Starting deployment process..."
    echo ""

    # Ask for confirmation
    echo -e "${YELLOW}🚀 Ready to deploy docs.itsdifferentproductions.com${NC}"
    echo ""
    echo "This will:"
    echo "  • Configure DNS records"
    echo "  • Deploy to Vercel"
    echo "  • Set up custom domain"
    echo "  • Verify deployment"
    echo ""
    read -p "Continue with deployment? (y/N): " confirm

    if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
        print_warning "Deployment cancelled by user"
        echo ""
        echo "You can run the deployment later with:"
        echo "  ./scripts/deploy-docs.sh"
        exit 0
    fi

    # Run deployment script
    ./scripts/deploy-docs.sh
}

# Display completion message
show_completion() {
    echo ""
    echo -e "${GREEN}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║                    🎉 Setup Complete! 🎉                     ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    echo -e "${BLUE}📚 Your documentation site is now available at:${NC}"
    echo -e "${GREEN}   https://docs.itsdifferentproductions.com${NC}"
    echo ""
    echo -e "${BLUE}🔗 Quick Links:${NC}"
    echo "   • Main Site: https://itsdifferentproductions.vercel.app"
    echo "   • GitHub: https://github.com/yourusername/itsdifferentproductions"
    echo "   • Discord: https://discord.gg/yourinvite"
    echo ""
    echo -e "${BLUE}📋 What's Next:${NC}"
    echo "   • Wait 5-30 minutes for full DNS propagation"
    echo "   • Check the site in different browsers"
    echo "   • Update your documentation content"
    echo "   • Set up GitHub Actions for automatic deployments"
    echo ""
    echo -e "${YELLOW}💝 Support the Project:${NC}"
    echo "   Solana Address: h4shed.sol"
    echo ""
}

# Main function
main() {
    print_banner

    # Check if help was requested
    if [[ "$1" == "--help" || "$1" == "-h" ]]; then
        echo "Usage: $0 [options]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo "  --skip-deps    Skip dependency checks"
        echo "  --config-only  Only create configuration, don't deploy"
        echo ""
        echo "Environment Variables:"
        echo "  VERCEL_TOKEN                    Your Vercel authentication token"
        echo "  DNS_PROVIDER                    DNS provider (vercel, cloudflare, namecheap)"
        echo "  CLOUDFLARE_EMAIL                Cloudflare account email"
        echo "  CLOUDFLARE_API_KEY              Cloudflare API key"
        echo "  NEXT_PUBLIC_SUPABASE_URL        Your Supabase project URL"
        echo "  NEXT_PUBLIC_SUPABASE_ANON_KEY   Your Supabase anonymous key"
        echo ""
        exit 0
    fi

    # Run setup steps
    check_os

    if [[ "$1" != "--skip-deps" ]]; then
        check_prerequisites
        install_vercel_cli
    fi

    collect_configuration
    create_environment_file
    setup_scripts
    setup_docs_branch

    if [[ "$1" != "--config-only" ]]; then
        run_deployment
        show_completion
    else
        print_success "Configuration complete."
        echo ""
        echo -e "${BLUE}📝 Next Steps:${NC}"
        echo "1. Edit .env.local with your Supabase credentials"
        echo "2. Run './scripts/deploy-docs.sh' to deploy"
        echo "3. Or run the full deployment with: ./setup-docs.sh"
    fi
}

# Run main function with all arguments
main "$@"
