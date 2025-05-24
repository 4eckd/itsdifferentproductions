# Documentation Branch Strategy

## 🎯 **Overview**

This document outlines the documentation branch strategy for Its Different Productions, which allows you to deploy documentation separately from your main application while using the same Vercel project for easy management.

## 🌿 **Branch Strategy**

### **Two-Branch Approach**

- **`main`** - Main application code and development
- **`docs`** - Documentation-only deployment branch

### **Benefits**

✅ **Separate Deployments** - Documentation deploys independently from main app  
✅ **Same Vercel Project** - Unified project management  
✅ **Automatic Sync** - Documentation stays in sync with main branch  
✅ **Clean History** - Separate commit history for docs  
✅ **Easy Management** - Simple branch switching for docs work  
✅ **CI/CD Ready** - Automated deployment workflows  

## 🚀 **Quick Setup**

### **1. Create Docs Branch**

```bash
# Run the automated setup
./scripts/setup-docs-branch.sh
```

This will:
- Create a `docs` branch from `main`
- Configure docs-specific Vercel settings
- Set up GitHub Actions workflow
- Create documentation management scripts

### **2. Configure Environment**

Update your `.env.local` to enable docs branch strategy:

```bash
# Documentation Branch Settings
DOCS_DEPLOYMENT_TYPE=branch
DOCS_VERCEL_CONFIG=vercel-docs.json
DOCS_BRANCH=docs
```

### **3. Push Docs Branch**

```bash
# Push the new docs branch to remote
git push -u origin docs
```

## 📁 **File Structure**

After setup, you'll have these new files:

```
├── vercel-docs.json          # Docs-specific Vercel config
├── package-docs.json         # Docs-specific package.json
├── README-DOCS.md           # Documentation for docs branch
├── .github/workflows/
│   └── deploy-docs-branch.yml # Docs branch CI/CD
└── scripts/
    ├── setup-docs-branch.sh    # Initial setup script
    └── docs-branch-manager.sh  # Management utility
```

## 🔧 **Configuration Files**

### **vercel-docs.json**

Docs-specific Vercel configuration:

```json
{
  "version": 2,
  "name": "its-different-productions-docs",
  "alias": ["docs.itsdifferentproductions.com"],
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
    }
  ]
}
```

### **package-docs.json**

Docs-specific package configuration:

```json
{
  "name": "its-different-productions-docs",
  "scripts": {
    "dev": "python -m http.server 3001 --directory docs",
    "deploy": "vercel --prod --config=vercel-docs.json"
  }
}
```

## 🔄 **Workflow**

### **Working with Documentation**

1. **Switch to docs branch**
   ```bash
   git checkout docs
   ```

2. **Make documentation changes**
   ```bash
   # Edit files in docs/ directory
   nano docs/user-guides/new-feature.md
   ```

3. **Commit and push**
   ```bash
   git add .
   git commit -m "docs: add new feature guide"
   git push origin docs
   ```

4. **Automatic deployment**
   - GitHub Actions automatically deploys to `docs.itsdifferentproductions.com`

### **Syncing from Main Branch**

Keep documentation in sync with main branch changes:

```bash
# Use the management utility
./scripts/docs-branch-manager.sh sync
```

Or manually:

```bash
git checkout docs
git checkout main -- docs/
git add docs/
git commit -m "docs: sync from main branch"
git push origin docs
```

## 🛠️ **Management Commands**

Use the docs branch manager for common tasks:

```bash
# Show status
./scripts/docs-branch-manager.sh status

# Sync docs from main
./scripts/docs-branch-manager.sh sync

# Deploy documentation
./scripts/docs-branch-manager.sh deploy

# Create new documentation file
./scripts/docs-branch-manager.sh create user-guides/new-guide.md "New Guide"

# Update documentation index
./scripts/docs-branch-manager.sh update-index
```

## 🚀 **Deployment Options**

### **Automatic Deployment (Recommended)**

Push to `docs` branch triggers automatic deployment:

```bash
git checkout docs
# Make changes
git add .
git commit -m "docs: update documentation"
git push origin docs
# 🚀 Automatically deploys to docs.itsdifferentproductions.com
```

### **Manual Deployment**

Deploy manually when needed:

```bash
git checkout docs
./scripts/docs-branch-manager.sh deploy
```

### **From Main Branch**

Deploy docs while staying on main branch:

```bash
# This will sync docs and deploy
./scripts/deploy-docs.sh
```

## 🔧 **Vercel Project Configuration**

### **Single Project, Multiple Domains**

Your Vercel project can handle both:
- `itsdifferentproductions.vercel.app` (main app)
- `docs.itsdifferentproductions.com` (documentation)

### **Environment Variables**

Set these in your Vercel project:

```bash
# Main project
VERCEL_PROJECT_ID=your_main_project_id

# Docs project (can be same as main)
VERCEL_DOCS_PROJECT_ID=your_main_project_id

# Deployment strategy
DOCS_DEPLOYMENT_TYPE=branch
DOCS_VERCEL_CONFIG=vercel-docs.json
```

## 📊 **GitHub Actions**

### **Docs Branch Workflow**

The `deploy-docs-branch.yml` workflow:

- **Triggers**: Push to `docs` branch
- **Validates**: Documentation structure
- **Deploys**: To `docs.itsdifferentproductions.com`
- **Notifies**: Discord/Slack on completion

### **Main Branch Workflow**

Your existing workflow continues to deploy the main app.

## 🔍 **Monitoring & Verification**

### **Check Deployment Status**

```bash
# Check branch status
./scripts/docs-branch-manager.sh status

# Verify deployment
curl -I https://docs.itsdifferentproductions.com
```

### **Local Development**

Serve docs locally:

```bash
git checkout docs
npm run dev  # Serves on http://localhost:3001
```

## 🚨 **Troubleshooting**

### **Common Issues**

**Docs branch doesn't exist:**
```bash
./scripts/setup-docs-branch.sh
```

**Out of sync with main:**
```bash
./scripts/docs-branch-manager.sh sync
```

**Deployment fails:**
```bash
# Check Vercel configuration
vercel --config=vercel-docs.json --prod --confirm
```

**GitHub Actions failing:**
- Check repository secrets are set
- Verify `VERCEL_TOKEN` is valid
- Ensure `vercel-docs.json` exists

### **Reset Docs Branch**

If you need to start over:

```bash
git branch -D docs
git push origin --delete docs
./scripts/setup-docs-branch.sh
```

## 🔄 **Migration from Single Branch**

If you're currently using single-branch deployment:

1. **Run setup script**
   ```bash
   ./scripts/setup-docs-branch.sh
   ```

2. **Update environment**
   ```bash
   # In .env.local
   DOCS_DEPLOYMENT_TYPE=branch
   ```

3. **Push docs branch**
   ```bash
   git push -u origin docs
   ```

4. **Update Vercel project**
   - Add `docs.itsdifferentproductions.com` domain
   - Configure deployment settings

## 📈 **Advanced Usage**

### **Multiple Documentation Sites**

You can create additional branches for different documentation:

```bash
# API documentation branch
git checkout -b api-docs
# Configure for api.itsdifferentproductions.com

# Developer documentation branch
git checkout -b dev-docs
# Configure for dev.itsdifferentproductions.com
```

### **Staging Documentation**

Create a staging environment:

```bash
git checkout -b docs-staging
# Configure for docs-staging.itsdifferentproductions.com
```

## 🎯 **Best Practices**

1. **Keep docs branch clean** - Only documentation-related commits
2. **Regular syncing** - Sync from main branch frequently
3. **Descriptive commits** - Use clear commit messages with "docs:" prefix
4. **Review changes** - Use pull requests for major documentation updates
5. **Test locally** - Always test documentation locally before pushing
6. **Monitor deployments** - Check deployment status and fix issues quickly

## 📞 **Support**

If you need help with the docs branch strategy:

- **Check status**: `./scripts/docs-branch-manager.sh status`
- **Review logs**: Check GitHub Actions logs
- **Discord community**: Join our Discord for support
- **GitHub issues**: Create an issue for bugs or questions

---

**The docs branch strategy gives you the flexibility of separate documentation deployment while maintaining the simplicity of a single Vercel project!** 🚀
