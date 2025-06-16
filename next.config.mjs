/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  
  // Subdomain routing configuration
  async rewrites() {
    return [
      // Redirect subdomain traffic to investor routes
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
      // Handle root subdomain requests
      {
        source: '/',
        destination: '/investor',
        has: [
          {
            type: 'host',
            value: 'vc.itsdifferentproductions.com',
          },
        ],
      },
    ]
  },

  // Security and performance headers
  async headers() {
    return [
      {
        source: '/investor/:path*',
        headers: [
          {
            key: 'X-Investor-Portal',
            value: 'true',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ]
  },

  // Image optimization
  images: {
    domains: [
      'itsdifferentproductions.com',
      'vc.itsdifferentproductions.com',
      'docs.itsdifferentproductions.com',
    ],
    formats: ['image/webp', 'image/avif'],
  },

  // Webpack configuration for Chart.js
  webpack: (config, { isServer }) => {
    // Handle Chart.js canvas dependency
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      }
    }

    // Handle file imports
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      type: 'asset/resource',
    })

    return config
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://itsdifferentproductions.com',
    NEXT_PUBLIC_INVESTOR_URL: process.env.NEXT_PUBLIC_INVESTOR_URL || 'https://vc.itsdifferentproductions.com',
    NEXT_PUBLIC_DOCS_URL: process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.itsdifferentproductions.com',
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect old pitch deck URLs if any
      {
        source: '/pitch-deck',
        destination: '/investor/pitch',
        permanent: true,
      },
      {
        source: '/financials',
        destination: '/investor/financials',
        permanent: true,
      },
    ]
  },

  // Optimize for production
  swcMinify: true,
  compress: true,
  
  // Enable static optimization
  trailingSlash: false,
  
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
}

export default nextConfig
