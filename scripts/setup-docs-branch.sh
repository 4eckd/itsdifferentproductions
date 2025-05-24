#!/bin/bash

# Setup Documentation Branch Strategy
# Creates and configures a dedicated docs branch for documentation deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Configuration
DOCS_BRANCH="docs"
MAIN_BRANCH="master"
DOCS_DIR="docs"
VERCEL_JSON_DOCS="vercel-docs.json"

print_banner() {
    echo -e "${PURPLE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║           📚 Documentation Branch Setup                      ║"
    echo "║                                                              ║"
    echo "║        Setting up dedicated docs branch deployment           ║"
    echo "║                                                              ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_step() {
    echo -e "${BLUE}🔄 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if we're in a git repository
check_git_repo() {
    print_step "Checking Git repository..."

    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        print_error "Not in a Git repository. Please run this from your project root."
        exit 1
    fi

    print_success "Git repository detected"
}

# Check current branch and status
check_git_status() {
    print_step "Checking Git status..."

    local current_branch=$(git branch --show-current)
    print_step "Current branch: $current_branch"

    if [[ -n $(git status --porcelain) ]]; then
        print_warning "You have uncommitted changes. Consider committing them first."
        echo ""
        git status --short
        echo ""
        read -p "Continue anyway? (y/N): " continue_anyway
        if [[ "$continue_anyway" != "y" && "$continue_anyway" != "Y" ]]; then
            print_warning "Aborting. Please commit your changes first."
            exit 1
        fi
    fi

    print_success "Git status checked"
}

# Create docs branch if it doesn't exist
create_docs_branch() {
    print_step "Setting up docs branch..."

    # Check if docs branch already exists
    if git show-ref --verify --quiet refs/heads/$DOCS_BRANCH; then
        print_warning "Docs branch already exists"
        read -p "Do you want to recreate it? This will delete the existing branch. (y/N): " recreate
        if [[ "$recreate" == "y" || "$recreate" == "Y" ]]; then
            git branch -D $DOCS_BRANCH
            print_step "Deleted existing docs branch"
        else
            print_step "Using existing docs branch"
            return 0
        fi
    fi

    # Create new docs branch from main
    git checkout $MAIN_BRANCH
    git pull origin $MAIN_BRANCH 2>/dev/null || true
    git checkout -b $DOCS_BRANCH

    print_success "Created docs branch from $MAIN_BRANCH"
}

# Configure docs branch for documentation-only deployment
configure_docs_branch() {
    print_step "Configuring docs branch for documentation deployment..."

    # Create docs-specific Vercel configuration
    cat > $VERCEL_JSON_DOCS << EOF
{
  "version": 2,
  "name": "its-different-productions-docs",
  "alias": ["docs.itsdifferentproductions.com"],
  "regions": ["sfo1", "iad1"],
  "builds": [
    {
      "src": "docs/**",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/",
      "dest": "/docs/index.html"
    },
    {
      "src": "/getting-started/(.*)",
      "dest": "/docs/getting-started/\$1.html"
    },
    {
      "src": "/user-guides/(.*)",
      "dest": "/docs/user-guides/\$1.html"
    },
    {
      "src": "/creator-guides/(.*)",
      "dest": "/docs/creator-guides/\$1.html"
    },
    {
      "src": "/api/(.*)",
      "dest": "/docs/api/\$1.html"
    },
    {
      "src": "/design-system/(.*)",
      "dest": "/docs/design-system/\$1.html"
    },
    {
      "src": "/admin/(.*)",
      "dest": "/docs/admin/\$1.html"
    },
    {
      "src": "/deployment/(.*)",
      "dest": "/docs/deployment/\$1.html"
    },
    {
      "src": "/(.*)",
      "dest": "/docs/\$1.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/docs/(.*).md",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/markdown; charset=utf-8"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/documentation/(.*)",
      "destination": "/\$1",
      "permanent": true
    }
  ],
  "cleanUrls": true,
  "trailingSlash": false
}
EOF

    print_success "Created docs-specific Vercel configuration"
}

# Create docs-specific package.json
create_docs_package() {
    print_step "Creating docs-specific package.json..."

    cat > package-docs.json << EOF
{
  "name": "its-different-productions-docs",
  "version": "1.0.0",
  "description": "Documentation site for Its Different Productions",
  "scripts": {
    "build": "echo 'Documentation is static - no build needed'",
    "dev": "python -m http.server 3001 --directory docs || python3 -m http.server 3001 --directory docs",
    "preview": "python -m http.server 8080 --directory docs || python3 -m http.server 8080 --directory docs",
    "validate": "node ../scripts/validate-docs.js",
    "deploy": "vercel --prod"
  },
  "keywords": ["documentation", "beats", "marketplace", "music"],
  "author": "Its Different Productions",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/itsdifferentproductions.git",
    "directory": "docs"
  }
}
EOF

    print_success "Created docs-specific package.json"
}

# Create docs deployment workflow
create_docs_workflow() {
    print_step "Creating docs-specific GitHub Actions workflow..."

    mkdir -p .github/workflows

    cat > .github/workflows/deploy-docs-branch.yml << EOF
name: Deploy Documentation (Docs Branch)

on:
  push:
    branches: [docs]
    paths:
      - 'docs/**'
      - 'vercel-docs.json'
      - 'package-docs.json'
  pull_request:
    branches: [docs]
    paths:
      - 'docs/**'
  workflow_dispatch:

env:
  VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: \${{ secrets.VERCEL_DOCS_PROJECT_ID }}

jobs:
  validate-docs:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout docs branch
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Validate documentation structure
        run: |
          echo "🔍 Validating documentation structure..."

          # Check required files
          required_files=("docs/index.md" "vercel-docs.json" "package-docs.json")
          for file in "\${required_files[@]}"; do
            if [[ -f "\$file" ]]; then
              echo "✅ \$file exists"
            else
              echo "❌ \$file is missing"
              exit 1
            fi
          done

          # Check markdown files
          find docs -name "*.md" -type f | while read file; do
            echo "📄 Checking \$file"
            if ! grep -q "^# " "\$file"; then
              echo "⚠️ Warning: \$file may be missing a main heading"
            fi
          done

  deploy-docs:
    runs-on: ubuntu-latest
    needs: validate-docs
    if: github.ref == 'refs/heads/docs'
    environment: production
    steps:
      - name: Checkout docs branch
        uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install -g vercel@latest

      - name: Deploy to Vercel
        run: |
          vercel --token=\${{ secrets.VERCEL_TOKEN }} \\
                 --config=vercel-docs.json \\
                 --prod \\
                 --confirm
        env:
          VERCEL_TOKEN: \${{ secrets.VERCEL_TOKEN }}

      - name: Create deployment summary
        run: |
          echo "## 📚 Documentation Deployment Summary" >> \$GITHUB_STEP_SUMMARY
          echo "" >> \$GITHUB_STEP_SUMMARY
          echo "🌐 **URL**: https://docs.itsdifferentproductions.com" >> \$GITHUB_STEP_SUMMARY
          echo "📅 **Deployed**: \$(date)" >> \$GITHUB_STEP_SUMMARY
          echo "📝 **Commit**: \${{ github.sha }}" >> \$GITHUB_STEP_SUMMARY
          echo "🌿 **Branch**: docs" >> \$GITHUB_STEP_SUMMARY

      - name: Notify Discord
        if: success()
        run: |
          curl -X POST -H 'Content-type: application/json' \\
            --data '{"content":"📚 Documentation deployed from docs branch!\\n🌐 https://docs.itsdifferentproductions.com\\n⏰ '\$(date)'"}' \\
            \${{ secrets.DISCORD_WEBHOOK_URL }} || true
EOF

    print_success "Created docs-specific GitHub Actions workflow"
}

# Update environment configuration for docs branch
update_env_for_docs() {
    print_step "Updating environment configuration for docs branch..."

    # Update .env.local for docs branch
    if [[ -f ".env.local" ]]; then
        # Add docs branch specific variables
        if ! grep -q "DOCS_BRANCH" .env.local; then
            cat >> .env.local << EOF

# ============================================================================
# DOCS BRANCH CONFIGURATION
# ============================================================================

# Documentation Branch Settings
DOCS_BRANCH=docs
DOCS_DEPLOYMENT_TYPE=branch
DOCS_VERCEL_CONFIG=vercel-docs.json

EOF
        fi
        print_success "Updated .env.local with docs branch configuration"
    fi
}

# Create README for docs branch
create_docs_readme() {
    print_step "Creating README for docs branch..."

    cat > README-DOCS.md << EOF
# Its Different Productions - Documentation Branch

This branch is dedicated to documentation deployment and maintenance.

## 🌿 Branch Strategy

- **main**: Main application code
- **docs**: Documentation-only deployment

## 🚀 Deployment

This branch automatically deploys to \`docs.itsdifferentproductions.com\` when changes are pushed.

### Manual Deployment

\`\`\`bash
# Deploy documentation
vercel --config=vercel-docs.json --prod
\`\`\`

### Local Development

\`\`\`bash
# Serve docs locally
npm run dev

# Preview on port 8080
npm run preview
\`\`\`

## 📁 Structure

\`\`\`
docs/
├── index.md                 # Main documentation page
├── getting-started/         # Getting started guides
├── user-guides/            # User documentation
├── creator-guides/         # Creator documentation
├── api/                    # API documentation
├── design-system/          # Design system docs
├── admin/                  # Admin documentation
└── deployment/             # Deployment guides
\`\`\`

## 🔄 Workflow

1. **Make changes** to documentation in \`docs/\` directory
2. **Commit and push** to \`docs\` branch
3. **GitHub Actions** automatically validates and deploys
4. **Documentation** is live at https://docs.itsdifferentproductions.com

## 🔗 Links

- **Live Documentation**: https://docs.itsdifferentproductions.com
- **Main Application**: https://itsdifferentproductions.vercel.app
- **GitHub Repository**: https://github.com/yourusername/itsdifferentproductions

## 📝 Contributing

1. Switch to docs branch: \`git checkout docs\`
2. Make your documentation changes
3. Commit and push: \`git add . && git commit -m "docs: update documentation" && git push origin docs\`
4. Documentation will be automatically deployed

---

**Made with ❤️ by the Its Different Productions Team**
EOF

    print_success "Created README for docs branch"
}

# Main execution
main() {
    print_banner

    check_git_repo
    check_git_status
    create_docs_branch
    configure_docs_branch
    create_docs_package
    create_docs_workflow
    update_env_for_docs
    create_docs_readme

    # Commit the docs branch configuration
    git add .
    git commit -m "feat: setup docs branch for documentation deployment

- Add docs-specific Vercel configuration
- Create docs-specific package.json
- Add GitHub Actions workflow for docs branch
- Configure environment for docs deployment
- Add documentation README"

    print_success "Docs branch setup complete!"

    echo ""
    echo -e "${GREEN}🎉 Documentation Branch Setup Complete!${NC}"
    echo ""
    echo -e "${BLUE}📋 What was created:${NC}"
    echo "  • docs branch with documentation-specific configuration"
    echo "  • vercel-docs.json for docs deployment"
    echo "  • package-docs.json for docs scripts"
    echo "  • GitHub Actions workflow for automatic deployment"
    echo "  • Updated environment configuration"
    echo ""
    echo -e "${BLUE}🚀 Next Steps:${NC}"
    echo "  1. Push docs branch: git push -u origin docs"
    echo "  2. Configure Vercel project for docs.itsdifferentproductions.com"
    echo "  3. Set up GitHub secrets for automatic deployment"
    echo "  4. Make documentation changes and push to docs branch"
    echo ""
    echo -e "${YELLOW}💡 Usage:${NC}"
    echo "  • Work on docs: git checkout docs"
    echo "  • Deploy manually: vercel --config=vercel-docs.json --prod"
    echo "  • Auto-deploy: Push to docs branch"
    echo ""
}

# Handle script arguments
case "${1:-}" in
    --help|-h)
        echo "Usage: $0 [options]"
        echo ""
        echo "Options:"
        echo "  --help, -h     Show this help message"
        echo ""
        echo "This script sets up a dedicated docs branch for documentation deployment."
        echo ""
        exit 0
        ;;
esac

# Run main function
main "$@"
