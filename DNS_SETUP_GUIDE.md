# DNS Setup Guide for docs.itsdifferentproductions.com

This guide provides automated and manual instructions for setting up DNS for your documentation site.

## 🚀 Quick Automated Setup

### Option 1: One-Command Setup (Recommended)

```bash
# Run the automated setup script
./setup-docs.sh
```

This script will:
- ✅ Check all prerequisites
- ✅ Install required tools
- ✅ Collect your configuration
- ✅ Configure DNS automatically
- ✅ Deploy to Vercel
- ✅ Verify the deployment

### Option 2: Step-by-Step Automated Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.dns.example .env.dns

# 3. Edit .env.dns with your values
nano .env.dns

# 4. Run DNS configuration
node scripts/setup-docs-dns.js

# 5. Deploy documentation
./scripts/deploy-docs.sh
```

## 🔧 Prerequisites

### Required Tools

- **Node.js** (v18 or higher)
- **npm** or **pnpm**
- **Git**
- **curl**
- **Vercel CLI** (installed automatically)

### Required Accounts

1. **Vercel Account** - [Sign up here](https://vercel.com)
2. **DNS Provider Account** (one of):
   - Vercel DNS (recommended)
   - Cloudflare
   - Namecheap
   - GoDaddy
   - Other DNS provider

### Required Tokens

1. **Vercel Token** - Get from [Vercel Account Settings](https://vercel.com/account/tokens)
2. **DNS Provider API Key** (if not using Vercel DNS)

## 🌐 DNS Provider Configuration

### Vercel DNS (Recommended)

**Advantages:**
- ✅ Fully automated setup
- ✅ Integrated with deployment
- ✅ Automatic SSL certificates
- ✅ Global CDN included

**Setup:**
```bash
# Set environment variables
export VERCEL_TOKEN="your_vercel_token"
export DNS_PROVIDER="vercel"

# Run automated setup
./setup-docs.sh
```

### Cloudflare

**Advantages:**
- ✅ Advanced DNS features
- ✅ DDoS protection
- ✅ Analytics and insights
- ✅ Fast global network

**Setup:**
```bash
# Set environment variables
export VERCEL_TOKEN="your_vercel_token"
export DNS_PROVIDER="cloudflare"
export CLOUDFLARE_EMAIL="your_email@example.com"
export CLOUDFLARE_API_KEY="your_api_key"

# Run automated setup
./setup-docs.sh
```

**Manual DNS Records:**
```
Type: CNAME
Name: docs
Content: cname.vercel-dns.com
TTL: Auto
```

### Namecheap

**Manual DNS Records:**
```
Type: CNAME Record
Host: docs
Value: cname.vercel-dns.com
TTL: Automatic
```

**Steps:**
1. Log in to Namecheap
2. Go to Domain List → Manage
3. Click "Advanced DNS"
4. Add new CNAME record with values above

### GoDaddy

**Manual DNS Records:**
```
Type: CNAME
Name: docs
Value: cname.vercel-dns.com
TTL: 1 Hour
```

**Steps:**
1. Log in to GoDaddy
2. Go to My Products → DNS
3. Click "Add" → "CNAME"
4. Enter values above

## 📋 Environment Configuration

### Required Environment Variables

Create `.env.dns` file with these values:

```bash
# Vercel Configuration (Required)
VERCEL_TOKEN=your_vercel_token_here
VERCEL_TEAM_ID=your_team_id_here
VERCEL_PROJECT_ID=your_project_id_here

# DNS Provider (Required)
DNS_PROVIDER=vercel  # or cloudflare, namecheap, etc.

# Domain Configuration (Required)
DOMAIN=itsdifferentproductions.com
SUBDOMAIN=docs
FULL_DOMAIN=docs.itsdifferentproductions.com

# Cloudflare (if using Cloudflare)
CLOUDFLARE_EMAIL=your_email@example.com
CLOUDFLARE_API_KEY=your_api_key
CLOUDFLARE_ZONE_ID=your_zone_id

# Notifications (Optional)
DISCORD_WEBHOOK_URL=your_discord_webhook
SLACK_WEBHOOK_URL=your_slack_webhook
```

### Getting Your Vercel Token

1. Go to [Vercel Account Settings](https://vercel.com/account/tokens)
2. Click "Create Token"
3. Name it "Documentation Deployment"
4. Set expiration (recommend 1 year)
5. Copy the token immediately

### Getting Cloudflare API Key

1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use "Custom token" template
4. Set permissions:
   - Zone:Zone:Read
   - Zone:DNS:Edit
5. Include your domain in zone resources

## 🔍 Verification Steps

### 1. DNS Propagation Check

```bash
# Check DNS resolution
nslookup docs.itsdifferentproductions.com

# Check with dig
dig docs.itsdifferentproductions.com

# Online tools
# - https://dnschecker.org
# - https://whatsmydns.net
```

### 2. SSL Certificate Check

```bash
# Check SSL certificate
curl -I https://docs.itsdifferentproductions.com

# Check certificate details
openssl s_client -connect docs.itsdifferentproductions.com:443 -servername docs.itsdifferentproductions.com
```

### 3. Site Accessibility

```bash
# Check if site loads
curl -f https://docs.itsdifferentproductions.com

# Check response time
curl -o /dev/null -s -w '%{time_total}' https://docs.itsdifferentproductions.com
```

## 🚨 Troubleshooting

### Common Issues

**DNS Not Resolving:**
- Wait 5-30 minutes for propagation
- Check DNS records are correct
- Verify domain ownership
- Clear local DNS cache: `sudo dscacheutil -flushcache` (macOS)

**SSL Certificate Issues:**
- Wait for Vercel to provision certificate (up to 24 hours)
- Ensure DNS is pointing to Vercel
- Check domain verification in Vercel dashboard

**Site Not Loading:**
- Verify Vercel deployment succeeded
- Check Vercel function logs
- Ensure all environment variables are set

**Permission Errors:**
- Verify API tokens have correct permissions
- Check token expiration dates
- Ensure team/organization access

### Debug Commands

```bash
# Check DNS configuration
./scripts/setup-docs-dns.js --debug

# Verbose deployment
./scripts/deploy-docs.sh --verbose

# Test configuration only
./setup-docs.sh --config-only
```

### Log Files

Check these log files for detailed information:
- `logs/dns-setup.log` - DNS configuration logs
- `logs/deployment.log` - Deployment logs
- `logs/verification.log` - Verification logs

## 📞 Getting Help

### Support Channels

- **GitHub Issues**: [Report problems](https://github.com/yourusername/itsdifferentproductions/issues)
- **Discord Community**: [Join our Discord](https://discord.gg/yourinvite)
- **Email Support**: support@itsdifferentproductions.com

### Before Asking for Help

Please provide:
1. Your operating system
2. DNS provider being used
3. Error messages (full text)
4. Log files from `logs/` directory
5. Output of `nslookup docs.itsdifferentproductions.com`

## 🔄 Updating DNS Configuration

### Changing DNS Provider

```bash
# Update environment file
nano .env.dns

# Change DNS_PROVIDER value
# Re-run configuration
node scripts/setup-docs-dns.js
```

### Adding Additional Domains

```bash
# Add to Vercel project
vercel domains add subdomain.itsdifferentproductions.com

# Configure DNS records
# Follow same process for new subdomain
```

## 🎯 Next Steps

After successful DNS setup:

1. **Verify Site Access**: https://docs.itsdifferentproductions.com
2. **Set Up GitHub Actions**: Automated deployments on push
3. **Configure Monitoring**: Set up uptime monitoring
4. **Update Documentation**: Add your content
5. **Share with Team**: Provide access to team members

## 💝 Support the Project

If this setup helped you, consider supporting the project:

**Solana Donation Address:**
```
h4shed.sol
```

---

**Need more help?** Check our [comprehensive documentation](https://docs.itsdifferentproductions.com) or join our [Discord community](https://discord.gg/yourinvite).
