/**
 * Environment Variable Validation Utility
 * Ensures all required environment variables are properly configured
 */

import { z } from 'zod'

// Define validation schemas for different environments
const baseSchema = z.object({
  // Core Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url(),
  NEXT_PUBLIC_ENVIRONMENT: z.string().default('development'),

  // Supabase (Required)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
})

const deploymentSchema = z.object({
  // Vercel
  VERCEL_TOKEN: z.string().min(1).optional(),
  VERCEL_ORG_ID: z.string().optional(),
  VERCEL_PROJECT_ID: z.string().optional(),
  VERCEL_DOCS_PROJECT_ID: z.string().optional(),

  // Domain
  DOMAIN: z.string().default('itsdifferentproductions.com'),
  DOCS_SUBDOMAIN: z.string().default('docs'),
  DOCS_DOMAIN: z.string().default('docs.itsdifferentproductions.com'),

  // DNS Provider
  DNS_PROVIDER: z.enum(['vercel', 'cloudflare', 'namecheap', 'godaddy', 'manual']).default('vercel'),
})

const paymentsSchema = z.object({
  // NOW Payments
  NOW_PAYMENTS_API_KEY: z.string().optional(),
  NOW_PAYMENTS_IPN_SECRET: z.string().optional(),
  NOW_PAYMENTS_SANDBOX: z.string().transform(val => val === 'true').default('true'),

  // Stripe (future)
  STRIPE_PUBLISHABLE_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
})

const web3Schema = z.object({
  // Web3 Configuration
  NEXT_PUBLIC_WEB3_NETWORK: z.string().default('mainnet'),
  NEXT_PUBLIC_CHAIN_ID: z.string().transform(Number).default('1'),
  NEXT_PUBLIC_RPC_URL: z.string().url().optional(),

  // Contract Addresses
  NEXT_PUBLIC_NFT_CONTRACT_ADDRESS: z.string().optional(),
  NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS: z.string().optional(),

  // Wallet Connect
  NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: z.string().optional(),
})

const analyticsSchema = z.object({
  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_VERCEL_ANALYTICS_ID: z.string().optional(),

  // Error Tracking
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // Product Analytics
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
})

const notificationsSchema = z.object({
  // Discord
  DISCORD_WEBHOOK_URL: z.string().url().optional(),
  DISCORD_BOT_TOKEN: z.string().optional(),
  DISCORD_GUILD_ID: z.string().optional(),

  // Slack
  SLACK_WEBHOOK_URL: z.string().url().optional(),
  SLACK_BOT_TOKEN: z.string().optional(),
  SLACK_CHANNEL_ID: z.string().optional(),

  // Email
  EMAIL_SERVICE_API_KEY: z.string().optional(),
  EMAIL_FROM_ADDRESS: z.string().email().optional(),
  NOTIFICATION_EMAIL: z.string().email().optional(),
})

const securitySchema = z.object({
  // JWT
  JWT_SECRET: z.string().min(32).optional(),
  JWT_EXPIRES_IN: z.string().default('7d'),

  // Session
  SESSION_SECRET: z.string().min(32).optional(),
  SESSION_MAX_AGE: z.string().transform(Number).default('604800'),

  // Rate Limiting
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default('100'),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default('900000'),

  // CORS
  CORS_ORIGIN: z.string().optional(),
})

const featureFlagsSchema = z.object({
  // Feature Flags
  FEATURE_NFT_MARKETPLACE: z.string().transform(val => val === 'true').default('true'),
  FEATURE_CRYPTO_PAYMENTS: z.string().transform(val => val === 'true').default('true'),
  FEATURE_WEB3_WALLET: z.string().transform(val => val === 'true').default('false'),
  FEATURE_ADMIN_DASHBOARD: z.string().transform(val => val === 'true').default('false'),
  FEATURE_ANALYTICS_DASHBOARD: z.string().transform(val => val === 'true').default('true'),
  FEATURE_SOCIAL_LOGIN: z.string().transform(val => val === 'true').default('false'),
})

const donationSchema = z.object({
  // Donation
  SOLANA_DONATION_ADDRESS: z.string().default('h4shed.sol'),
  DONATION_ENABLED: z.string().transform(val => val === 'true').default('true'),
})

// Combine all schemas
const fullSchema = baseSchema
  .merge(deploymentSchema)
  .merge(paymentsSchema)
  .merge(web3Schema)
  .merge(analyticsSchema)
  .merge(notificationsSchema)
  .merge(securitySchema)
  .merge(featureFlagsSchema)
  .merge(donationSchema)

// Environment-specific required fields
const requiredForProduction = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'VERCEL_TOKEN',
  'JWT_SECRET',
  'SESSION_SECRET',
] as const

const requiredForDevelopment = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
] as const

// Validation functions
export function validateEnvironment() {
  try {
    const env = fullSchema.parse(process.env)

    // Check environment-specific requirements
    if (env.NODE_ENV === 'production') {
      validateRequiredFields(requiredForProduction)
    } else {
      validateRequiredFields(requiredForDevelopment)
    }

    return {
      success: true,
      env,
      errors: [],
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        env: null,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        })),
      }
    }

    return {
      success: false,
      env: null,
      errors: [{ field: 'unknown', message: 'Unknown validation error', code: 'unknown' }],
    }
  }
}

function validateRequiredFields(requiredFields: readonly string[]) {
  const missing = requiredFields.filter(field => !process.env[field])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Helper functions for specific validations
export function validateSupabaseConfig() {
  const required = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']
  const missing = required.filter(field => !process.env[field])

  if (missing.length > 0) {
    throw new Error(`Missing Supabase configuration: ${missing.join(', ')}`)
  }

  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  }
}

export function validateVercelConfig() {
  const required = ['VERCEL_TOKEN']
  const missing = required.filter(field => !process.env[field])

  if (missing.length > 0) {
    throw new Error(`Missing Vercel configuration: ${missing.join(', ')}`)
  }

  return {
    token: process.env.VERCEL_TOKEN!,
    orgId: process.env.VERCEL_ORG_ID,
    projectId: process.env.VERCEL_PROJECT_ID,
    docsProjectId: process.env.VERCEL_DOCS_PROJECT_ID,
  }
}

export function validatePaymentConfig() {
  return {
    nowPayments: {
      apiKey: process.env.NOW_PAYMENTS_API_KEY,
      ipnSecret: process.env.NOW_PAYMENTS_IPN_SECRET,
      sandbox: process.env.NOW_PAYMENTS_SANDBOX === 'true',
    },
    stripe: {
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      secretKey: process.env.STRIPE_SECRET_KEY,
      webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
    },
  }
}

export function validateWeb3Config() {
  return {
    network: process.env.NEXT_PUBLIC_WEB3_NETWORK || 'mainnet',
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID) || 1,
    rpcUrl: process.env.NEXT_PUBLIC_RPC_URL,
    nftContract: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
    tokenContract: process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  }
}

export function getFeatureFlags() {
  return {
    nftMarketplace: process.env.FEATURE_NFT_MARKETPLACE === 'true',
    cryptoPayments: process.env.FEATURE_CRYPTO_PAYMENTS === 'true',
    web3Wallet: process.env.FEATURE_WEB3_WALLET === 'true',
    adminDashboard: process.env.FEATURE_ADMIN_DASHBOARD === 'true',
    analyticsDashboard: process.env.FEATURE_ANALYTICS_DASHBOARD === 'true',
    socialLogin: process.env.FEATURE_SOCIAL_LOGIN === 'true',
  }
}

// Environment info helper
export function getEnvironmentInfo() {
  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    docsUrl: process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
    domain: process.env.DOMAIN || 'itsdifferentproductions.com',
    docsDomain: process.env.DOCS_DOMAIN || 'docs.itsdifferentproductions.com',
    donationAddress: process.env.SOLANA_DONATION_ADDRESS || 'h4shed.sol',
    donationEnabled: process.env.DONATION_ENABLED === 'true',
  }
}

// Export the validated environment for use in the app
export const env = validateEnvironment()

if (!env.success) {
  console.error('❌ Environment validation failed:')
  env.errors.forEach(error => {
    console.error(`  - ${error.field}: ${error.message}`)
  })

  if (process.env.NODE_ENV === 'production') {
    throw new Error('Environment validation failed in production')
  }
}
