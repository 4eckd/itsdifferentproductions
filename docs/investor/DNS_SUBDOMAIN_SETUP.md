# 🌐 DNS Subdomain Setup Guide

**Goal**: Configure `vc.itsdifferentproductions.com` to serve investor portal content

## 📋 Prerequisites

- Access to domain registrar DNS settings for `itsdifferentproductions.com`
- Vercel project deployed with Next.js application
- Vercel CLI installed (`npm i -g vercel`)

## 🔧 Step 1: Vercel Domain Configuration

### Add Custom Domain to Vercel Project

```bash
# Navigate to your project directory
cd /path/to/idp-project

# Add the subdomain to Vercel
vercel domains add vc.itsdifferentproductions.com

# Link domain to your project
vercel domains link vc.itsdifferentproductions.com
```

### Alternative: Vercel Dashboard Method

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `itsdifferentproductions` project
3. Navigate to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `vc.itsdifferentproductions.com`
6. Click **Add**

## 🌐 Step 2: DNS Configuration

### Option A: Using Domain Registrar DNS

Add the following DNS records to your domain registrar:

```
Type: CNAME
Name: vc
Value: cname.vercel-dns.com
TTL: 300 (or default)
```

### Option B: Using Cloudflare (if applicable)

1. Log into Cloudflare dashboard
2. Select `itsdifferentproductions.com` domain
3. Go to **DNS** → **Records**
4. Click **Add record**
5. Configure:
   - **Type**: CNAME
   - **Name**: vc
   - **Target**: cname.vercel-dns.com
   - **Proxy status**: DNS only (gray cloud)
   - **TTL**: Auto

### Option C: Using Namecheap

1. Log into Namecheap account
2. Go to **Domain List** → **Manage** for itsdifferentproductions.com
3. Navigate to **Advanced DNS**
4. Add new record:
   - **Type**: CNAME Record
   - **Host**: vc
   - **Value**: cname.vercel-dns.com
   - **TTL**: Automatic

## ⚙️ Step 3: Next.js Configuration

### Update `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Subdomain routing for investor portal
      {
        source: '/:path*',
        destination: '/investor/:path*',
        has: [
          {
            type: 'host',
            value: 'vc.itsdifferentproductions.com',
          },
        ],
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/investor/:path*',
        headers: [
          {
            key: 'X-Investor-Portal',
            value: 'true',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://itsdifferentproductions.com
NEXT_PUBLIC_INVESTOR_URL=https://vc.itsdifferentproductions.com
NEXT_PUBLIC_DOCS_URL=https://docs.itsdifferentproductions.com
```

## 🔍 Step 4: Verification

### DNS Propagation Check

```bash
# Check DNS propagation
nslookup vc.itsdifferentproductions.com

# Expected output should show Vercel's IP addresses
# Example: 76.76.19.61, 76.76.21.21
```

### Online Tools

- [DNS Checker](https://dnschecker.org/)
- [What's My DNS](https://www.whatsmydns.net/)

Enter `vc.itsdifferentproductions.com` and check CNAME records globally.

## 🚀 Step 5: Deployment

### Deploy with Subdomain Support

```bash
# Build and deploy
npm run build
vercel --prod

# Verify deployment
curl -I https://vc.itsdifferentproductions.com
```

### Expected Response Headers

```
HTTP/2 200
x-investor-portal: true
x-vercel-cache: MISS
content-type: text/html; charset=utf-8
```

## 🧪 Step 6: Testing

### Test Subdomain Routing

1. **Main Site**: https://itsdifferentproductions.com
   - Should serve regular platform content
   
2. **Investor Portal**: https://vc.itsdifferentproductions.com
   - Should serve investor-specific content
   - Should redirect to `/investor` routes internally

3. **Documentation**: https://docs.itsdifferentproductions.com
   - Should continue working as before

### Cross-Domain Navigation

Test links between domains:
- From main site to investor portal
- From investor portal back to main site
- From either to documentation

## 🔧 Troubleshooting

### Common Issues

1. **DNS Not Propagating**
   - Wait 24-48 hours for full propagation
   - Check TTL settings (lower = faster propagation)

2. **SSL Certificate Issues**
   - Vercel automatically provisions SSL
   - May take 5-10 minutes after DNS propagation

3. **Routing Not Working**
   - Check `next.config.mjs` rewrites
   - Verify environment variables
   - Check Vercel function logs

### Debug Commands

```bash
# Check DNS resolution
dig vc.itsdifferentproductions.com

# Test SSL certificate
openssl s_client -connect vc.itsdifferentproductions.com:443

# Check Vercel deployment
vercel logs --follow
```

## 📊 Monitoring

### Analytics Setup

Add subdomain tracking to your analytics:

```javascript
// Google Analytics 4
gtag('config', 'GA_MEASUREMENT_ID', {
  custom_map: {
    'custom_parameter_1': 'investor_portal'
  }
});

// For investor portal pages
gtag('event', 'page_view', {
  custom_parameter_1: 'investor_portal',
  page_location: window.location.href
});
```

### Performance Monitoring

- Monitor Core Web Vitals for both domains
- Set up uptime monitoring for subdomain
- Track conversion rates from investor portal

## ✅ Success Criteria

- [ ] `vc.itsdifferentproductions.com` resolves correctly
- [ ] SSL certificate is valid and auto-renewing
- [ ] Investor content serves on subdomain
- [ ] Main platform remains unaffected
- [ ] Cross-domain navigation works
- [ ] Analytics tracking is configured
- [ ] Performance metrics are acceptable

---

**Next Steps**: Once DNS is configured and verified, proceed with content migration and final testing.
