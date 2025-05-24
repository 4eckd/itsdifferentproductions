# Production Deployment Guide

Complete guide for deploying Its Different Productions to production environments.

## 🚀 Deployment Overview

Our platform is designed for deployment on modern cloud platforms with the following architecture:

- **Frontend**: Next.js 15 application
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **Hosting**: Vercel (recommended)
- **CDN**: Vercel Edge Network
- **Monitoring**: Vercel Analytics

## 🔧 Prerequisites

### Required Accounts

1. **Vercel Account** - For hosting and deployment
2. **Supabase Account** - For database and backend services
3. **GitHub Account** - For source code management
4. **Domain Provider** - For custom domain (optional)

### Local Development Setup

Ensure your local environment is working:

```bash
# Clone the repository
git clone https://github.com/yourusername/itsdifferentproductions.git
cd itsdifferentproductions

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Run development server
pnpm dev
```

## 🗄️ Database Setup

### Supabase Project Creation

1. **Create New Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and region
   - Set database password

2. **Run Database Migrations**
   ```sql
   -- Execute in Supabase SQL Editor
   -- 1. Run schema.sql
   -- 2. Run schema-updates.sql
   -- 3. Run storage.sql
   ```

3. **Configure Row Level Security**
   ```sql
   -- Enable RLS on all tables
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE products ENABLE ROW LEVEL SECURITY;
   -- ... (continue for all tables)
   ```

### Storage Bucket Setup

Create the required storage buckets:

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('product_images', 'product_images', true),
  ('audio_files', 'audio_files', false),
  ('user_uploads', 'user_uploads', false),
  ('nft_assets', 'nft_assets', true);
```

### Authentication Configuration

1. **Email Settings**
   - Configure SMTP settings
   - Customize email templates
   - Set up email confirmation

2. **OAuth Providers** (Optional)
   - Google OAuth
   - GitHub OAuth
   - Discord OAuth

## 🌐 Vercel Deployment

### Initial Setup

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Login to Vercel
   vercel login

   # Deploy from project directory
   vercel
   ```

2. **Configure Project Settings**
   - Framework Preset: Next.js
   - Build Command: `pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

### Environment Variables

Set the following environment variables in Vercel dashboard:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Application Configuration
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_DOCS_URL=https://docs.yourdomain.com

# Payment Configuration (when ready)
NOW_PAYMENTS_API_KEY=your-now-payments-key
NOW_PAYMENTS_IPN_SECRET=your-ipn-secret

# Analytics (optional)
NEXT_PUBLIC_GA_ID=your-google-analytics-id
VERCEL_ANALYTICS_ID=your-vercel-analytics-id
```

### Build Configuration

Create `vercel.json` in project root:

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "regions": ["sfo1", "iad1"],
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/docs/:path*",
      "destination": "https://docs.yourdomain.com/:path*"
    }
  ]
}
```

## 🔒 Security Configuration

### Environment Security

1. **Secure Environment Variables**
   - Never commit secrets to repository
   - Use Vercel's encrypted environment variables
   - Rotate keys regularly

2. **CORS Configuration**
   ```typescript
   // next.config.mjs
   const nextConfig = {
     async headers() {
       return [
         {
           source: '/api/:path*',
           headers: [
             { key: 'Access-Control-Allow-Origin', value: 'https://yourdomain.com' },
             { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE' },
             { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
           ],
         },
       ]
     },
   }
   ```

### Content Security Policy

Add CSP headers for security:

```typescript
// next.config.mjs
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel.app *.supabase.co;
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data: *.supabase.co;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, ''),
          },
        ],
      },
    ]
  },
}
```

## 📊 Performance Optimization

### Next.js Optimizations

1. **Image Optimization**
   ```typescript
   // next.config.mjs
   const nextConfig = {
     images: {
       domains: ['your-supabase-url.supabase.co'],
       formats: ['image/webp', 'image/avif'],
       minimumCacheTTL: 60,
     },
   }
   ```

2. **Bundle Analysis**
   ```bash
   # Install bundle analyzer
   pnpm add -D @next/bundle-analyzer

   # Analyze bundle
   ANALYZE=true pnpm build
   ```

### Caching Strategy

1. **Static Assets**
   ```typescript
   // next.config.mjs
   const nextConfig = {
     async headers() {
       return [
         {
           source: '/static/:path*',
           headers: [
             {
               key: 'Cache-Control',
               value: 'public, max-age=31536000, immutable',
             },
           ],
         },
       ]
     },
   }
   ```

2. **API Caching**
   ```typescript
   // app/api/beats/route.ts
   export async function GET() {
     const data = await fetchBeats()
     
     return Response.json(data, {
       headers: {
         'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
       }
     })
   }
   ```

## 🔍 Monitoring and Analytics

### Vercel Analytics

Enable in `vercel.json`:

```json
{
  "analytics": {
    "enable": true
  },
  "speed-insights": {
    "enable": true
  }
}
```

### Error Monitoring

1. **Sentry Integration** (Optional)
   ```bash
   pnpm add @sentry/nextjs
   ```

   ```typescript
   // sentry.client.config.ts
   import * as Sentry from '@sentry/nextjs'

   Sentry.init({
     dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
     environment: process.env.NODE_ENV,
   })
   ```

2. **Custom Error Tracking**
   ```typescript
   // lib/error-tracking.ts
   export function trackError(error: Error, context?: any) {
     console.error('Application Error:', error, context)
     // Send to monitoring service
   }
   ```

### Performance Monitoring

1. **Core Web Vitals**
   ```typescript
   // app/layout.tsx
   import { Analytics } from '@vercel/analytics/react'
   import { SpeedInsights } from '@vercel/speed-insights/next'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <Analytics />
           <SpeedInsights />
         </body>
       </html>
     )
   }
   ```

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      
      - run: pnpm install
      - run: pnpm lint
      - run: pnpm build
      - run: pnpm test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Deployment Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Storage buckets created
- [ ] Security policies enabled
- [ ] Performance optimizations applied
- [ ] Monitoring configured
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Backup strategy in place

## 🌍 Custom Domain Setup

### Domain Configuration

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **DNS Records**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Automatically provisioned by Vercel
   - Includes www and apex domain
   - Auto-renewal enabled

## 🔄 Backup and Recovery

### Database Backups

1. **Automated Backups**
   - Supabase provides daily backups
   - Point-in-time recovery available
   - Cross-region replication (paid plans)

2. **Manual Backups**
   ```bash
   # Export database
   pg_dump -h your-db-host -U postgres -d postgres > backup.sql
   ```

### File Storage Backups

1. **Supabase Storage**
   - Built-in redundancy
   - Cross-region replication
   - Version history (paid plans)

2. **Additional Backup**
   ```bash
   # Sync to external storage
   aws s3 sync supabase-bucket s3://backup-bucket
   ```

## 📞 Support and Troubleshooting

### Common Issues

**Build Failures:**
- Check environment variables
- Verify dependencies
- Review build logs

**Database Connection:**
- Verify Supabase URL and keys
- Check network connectivity
- Review RLS policies

**Performance Issues:**
- Analyze bundle size
- Check database queries
- Review caching strategy

### Getting Help

- **Vercel Support** - Platform-specific issues
- **Supabase Support** - Database and backend issues
- **Community Discord** - General questions and tips
- **GitHub Issues** - Bug reports and feature requests

---

**Next Steps:**
- [Environment Variables Guide](./environment.md)
- [CI/CD Pipeline Setup](./ci-cd.md)
- [Monitoring and Analytics](./monitoring.md)
