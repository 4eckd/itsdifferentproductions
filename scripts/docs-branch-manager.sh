#!/bin/bash

# Documentation Branch Manager
# Utility for managing documentation branch operations

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Configuration
DOCS_BRANCH="docs"
MAIN_BRANCH="main"
DOCS_DIR="docs"

print_banner() {
    echo -e "${PURPLE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                                                              ║"
    echo "║           📚 Documentation Branch Manager                    ║"
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

# Show current branch status
show_status() {
    print_step "Documentation Branch Status"
    echo ""
    
    local current_branch=$(git branch --show-current)
    echo -e "${BLUE}Current Branch:${NC} $current_branch"
    
    # Check if docs branch exists
    if git show-ref --verify --quiet refs/heads/$DOCS_BRANCH; then
        echo -e "${GREEN}Docs Branch:${NC} ✅ Exists"
        
        # Check if docs branch is up to date with remote
        if git ls-remote --exit-code --heads origin $DOCS_BRANCH >/dev/null 2>&1; then
            local local_commit=$(git rev-parse $DOCS_BRANCH)
            local remote_commit=$(git rev-parse origin/$DOCS_BRANCH 2>/dev/null || echo "")
            
            if [[ "$local_commit" == "$remote_commit" ]]; then
                echo -e "${GREEN}Remote Sync:${NC} ✅ Up to date"
            else
                echo -e "${YELLOW}Remote Sync:${NC} ⚠️  Out of sync"
            fi
        else
            echo -e "${YELLOW}Remote Sync:${NC} ⚠️  Not pushed to remote"
        fi
    else
        echo -e "${RED}Docs Branch:${NC} ❌ Does not exist"
    fi
    
    # Check documentation files
    if [[ -d "$DOCS_DIR" ]]; then
        local doc_count=$(find $DOCS_DIR -name "*.md" -type f | wc -l)
        echo -e "${BLUE}Documentation Files:${NC} $doc_count markdown files"
    else
        echo -e "${RED}Documentation Directory:${NC} ❌ Missing"
    fi
    
    # Check Vercel configuration
    if [[ -f "vercel-docs.json" ]]; then
        echo -e "${GREEN}Vercel Config:${NC} ✅ vercel-docs.json exists"
    else
        echo -e "${YELLOW}Vercel Config:${NC} ⚠️  vercel-docs.json missing"
    fi
    
    echo ""
}

# Sync documentation from main to docs branch
sync_docs() {
    print_step "Syncing documentation from main to docs branch..."
    
    local current_branch=$(git branch --show-current)
    
    # Ensure we have the latest main
    git checkout $MAIN_BRANCH
    git pull origin $MAIN_BRANCH
    
    # Switch to docs branch
    if ! git show-ref --verify --quiet refs/heads/$DOCS_BRANCH; then
        print_error "Docs branch doesn't exist. Run setup first."
        exit 1
    fi
    
    git checkout $DOCS_BRANCH
    
    # Merge docs directory from main
    git checkout $MAIN_BRANCH -- $DOCS_DIR/
    
    # Check if there are changes
    if [[ -n $(git status --porcelain) ]]; then
        git add $DOCS_DIR/
        git commit -m "docs: sync documentation from main branch

Updated documentation files from main branch $(git rev-parse --short $MAIN_BRANCH)"
        
        print_success "Documentation synced and committed"
        
        # Ask if user wants to push
        read -p "Push changes to remote docs branch? (Y/n): " push_changes
        if [[ "$push_changes" != "n" && "$push_changes" != "N" ]]; then
            git push origin $DOCS_BRANCH
            print_success "Changes pushed to remote"
        fi
    else
        print_success "Documentation is already up to date"
    fi
    
    # Return to original branch
    git checkout $current_branch
}

# Deploy documentation
deploy_docs() {
    print_step "Deploying documentation..."
    
    local current_branch=$(git branch --show-current)
    
    # Switch to docs branch
    git checkout $DOCS_BRANCH
    
    # Check if vercel-docs.json exists
    if [[ ! -f "vercel-docs.json" ]]; then
        print_error "vercel-docs.json not found. Run setup first."
        exit 1
    fi
    
    # Deploy using Vercel
    if command -v vercel &> /dev/null; then
        print_step "Deploying with Vercel..."
        vercel --config=vercel-docs.json --prod --confirm
        print_success "Documentation deployed!"
        print_success "🌐 Live at: https://docs.itsdifferentproductions.com"
    else
        print_error "Vercel CLI not found. Install with: npm install -g vercel"
        exit 1
    fi
    
    # Return to original branch
    git checkout $current_branch
}

# Create new documentation file
create_doc() {
    local doc_path="$1"
    local doc_title="$2"
    
    if [[ -z "$doc_path" ]]; then
        read -p "Enter documentation path (e.g., user-guides/new-guide.md): " doc_path
    fi
    
    if [[ -z "$doc_title" ]]; then
        read -p "Enter document title: " doc_title
    fi
    
    local full_path="$DOCS_DIR/$doc_path"
    local dir_path=$(dirname "$full_path")
    
    # Create directory if it doesn't exist
    mkdir -p "$dir_path"
    
    # Create the documentation file
    cat > "$full_path" << EOF
# $doc_title

Brief description of this documentation.

## Overview

Provide an overview of the topic.

## Getting Started

Step-by-step instructions.

### Prerequisites

List any prerequisites.

### Steps

1. First step
2. Second step
3. Third step

## Examples

Provide examples and code snippets.

\`\`\`bash
# Example command
echo "Hello, World!"
\`\`\`

## Troubleshooting

Common issues and solutions.

## Next Steps

- Link to related documentation
- Additional resources

---

**Need help?** Join our [Discord community](https://discord.gg/yourinvite) or check our [FAQ](../getting-started/faq.md).
EOF

    print_success "Created documentation file: $full_path"
    print_step "You can now edit the file and commit your changes"
}

# Update documentation index
update_index() {
    print_step "Updating documentation index..."
    
    local index_file="$DOCS_DIR/index.md"
    
    if [[ ! -f "$index_file" ]]; then
        print_error "Documentation index not found: $index_file"
        exit 1
    fi
    
    # Backup current index
    cp "$index_file" "$index_file.backup"
    
    # Regenerate sections based on actual files
    local temp_file=$(mktemp)
    
    # Keep header until the navigation section
    sed '/## 🚀 Quick Navigation/q' "$index_file" > "$temp_file"
    
    # Generate navigation based on actual files
    echo "" >> "$temp_file"
    echo "<div style=\"display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;\">" >> "$temp_file"
    
    # Scan directories and generate navigation
    for dir in getting-started user-guides creator-guides api design-system admin deployment; do
        if [[ -d "$DOCS_DIR/$dir" ]]; then
            echo "" >> "$temp_file"
            echo "### 📁 $(echo $dir | sed 's/-/ /g' | sed 's/\b\w/\U&/g')" >> "$temp_file"
            find "$DOCS_DIR/$dir" -name "*.md" -type f | sort | while read file; do
                local basename=$(basename "$file" .md)
                local title=$(echo "$basename" | sed 's/-/ /g' | sed 's/\b\w/\U&/g')
                local relative_path=$(echo "$file" | sed "s|$DOCS_DIR/||")
                echo "- [$title](./$relative_path)" >> "$temp_file"
            done
        fi
    done
    
    echo "" >> "$temp_file"
    echo "</div>" >> "$temp_file"
    
    # Add the rest of the original file (skip navigation section)
    sed -n '/## 📊 Platform Statistics/,$p' "$index_file" >> "$temp_file"
    
    # Replace original file
    mv "$temp_file" "$index_file"
    
    print_success "Documentation index updated"
    print_step "Review the changes and commit if satisfied"
}

# Show help
show_help() {
    echo "Documentation Branch Manager"
    echo ""
    echo "Usage: $0 <command> [options]"
    echo ""
    echo "Commands:"
    echo "  status              Show documentation branch status"
    echo "  sync                Sync documentation from main to docs branch"
    echo "  deploy              Deploy documentation to production"
    echo "  create <path> <title>  Create new documentation file"
    echo "  update-index        Update documentation index"
    echo "  help                Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 status"
    echo "  $0 sync"
    echo "  $0 deploy"
    echo "  $0 create user-guides/new-feature.md \"New Feature Guide\""
    echo "  $0 update-index"
    echo ""
}

# Main function
main() {
    local command="${1:-help}"
    
    case "$command" in
        "status")
            print_banner
            show_status
            ;;
        "sync")
            print_banner
            sync_docs
            ;;
        "deploy")
            print_banner
            deploy_docs
            ;;
        "create")
            print_banner
            create_doc "$2" "$3"
            ;;
        "update-index")
            print_banner
            update_index
            ;;
        "help"|"--help"|"-h")
            print_banner
            show_help
            ;;
        *)
            print_error "Unknown command: $command"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Run main function
main "$@"
