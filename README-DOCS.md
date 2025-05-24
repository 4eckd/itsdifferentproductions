# Its Different Productions - Documentation Branch

This branch is dedicated to documentation deployment and maintenance.

## 🌿 Branch Strategy

- **main**: Main application code
- **docs**: Documentation-only deployment

## 🚀 Deployment

This branch automatically deploys to `docs.itsdifferentproductions.com` when changes are pushed.

### Manual Deployment

```bash
# Deploy documentation
vercel --config=vercel-docs.json --prod
```

### Local Development

```bash
# Serve docs locally
npm run dev

# Preview on port 8080
npm run preview
```

## 📁 Structure

```
docs/
├── index.md                 # Main documentation page
├── getting-started/         # Getting started guides
├── user-guides/            # User documentation
├── creator-guides/         # Creator documentation
├── api/                    # API documentation
├── design-system/          # Design system docs
├── admin/                  # Admin documentation
└── deployment/             # Deployment guides
```

## 🔄 Workflow

1. **Make changes** to documentation in `docs/` directory
2. **Commit and push** to `docs` branch
3. **GitHub Actions** automatically validates and deploys
4. **Documentation** is live at https://docs.itsdifferentproductions.com

## 🔗 Links

- **Live Documentation**: https://docs.itsdifferentproductions.com
- **Main Application**: https://itsdifferentproductions.vercel.app
- **GitHub Repository**: https://github.com/yourusername/itsdifferentproductions

## 📝 Contributing

1. Switch to docs branch: `git checkout docs`
2. Make your documentation changes
3. Commit and push: `git add . && git commit -m "docs: update documentation" && git push origin docs`
4. Documentation will be automatically deployed

---

**Made with ❤️ by the Its Different Productions Team**
