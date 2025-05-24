#!/usr/bin/env node

/**
 * Environment Validation Script
 * Checks if all required environment variables are properly configured
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Load environment variables
require('dotenv').config({ path: '.env.local' });

class EnvironmentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.info = [];
    this.success = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
    const colorMap = {
      error: colors.red,
      warning: colors.yellow,
      success: colors.green,
      info: colors.blue
    };
    
    console.log(`${colorMap[type]}[${timestamp}] ${message}${colors.reset}`);
    this[type === 'error' ? 'errors' : type === 'warning' ? 'warnings' : type === 'success' ? 'success' : 'info'].push(message);
  }

  checkRequired(varName, description) {
    const value = process.env[varName];
    if (!value || value.includes('your-') || value.includes('your_')) {
      this.log(`❌ ${varName}: ${description} (missing or placeholder)`, 'error');
      return false;
    } else {
      this.log(`✅ ${varName}: Configured`, 'success');
      return true;
    }
  }

  checkOptional(varName, description) {
    const value = process.env[varName];
    if (!value || value.includes('your-') || value.includes('your_')) {
      this.log(`⚠️  ${varName}: ${description} (optional, not configured)`, 'warning');
      return false;
    } else {
      this.log(`✅ ${varName}: Configured`, 'success');
      return true;
    }
  }

  checkUrl(varName, description) {
    const value = process.env[varName];
    if (!value) {
      this.log(`❌ ${varName}: ${description} (missing)`, 'error');
      return false;
    }
    
    try {
      new URL(value);
      this.log(`✅ ${varName}: Valid URL`, 'success');
      return true;
    } catch (e) {
      this.log(`❌ ${varName}: ${description} (invalid URL format)`, 'error');
      return false;
    }
  }

  validateCore() {
    this.log('\n🔍 Validating Core Application Settings...', 'info');
    
    this.checkUrl('NEXT_PUBLIC_APP_URL', 'Main application URL');
    this.checkUrl('NEXT_PUBLIC_DOCS_URL', 'Documentation site URL');
    this.checkRequired('NODE_ENV', 'Node environment');
    this.checkRequired('NEXT_PUBLIC_ENVIRONMENT', 'Application environment');
  }

  validateSupabase() {
    this.log('\n🗄️  Validating Supabase Configuration...', 'info');
    
    const supabaseUrl = this.checkUrl('NEXT_PUBLIC_SUPABASE_URL', 'Supabase project URL');
    const anonKey = this.checkRequired('NEXT_PUBLIC_SUPABASE_ANON_KEY', 'Supabase anonymous key');
    this.checkOptional('SUPABASE_SERVICE_ROLE_KEY', 'Supabase service role key (recommended)');
    
    if (supabaseUrl && anonKey) {
      this.log('✅ Supabase basic configuration is complete', 'success');
    }
  }

  validateVercel() {
    this.log('\n🚀 Validating Vercel Configuration...', 'info');
    
    const token = this.checkRequired('VERCEL_TOKEN', 'Vercel authentication token');
    this.checkOptional('VERCEL_ORG_ID', 'Vercel organization ID');
    this.checkOptional('VERCEL_PROJECT_ID', 'Main project ID');
    this.checkOptional('VERCEL_DOCS_PROJECT_ID', 'Documentation project ID');
    
    if (!token) {
      this.log('💡 Get your Vercel token from: https://vercel.com/account/tokens', 'info');
    }
  }

  validateDNS() {
    this.log('\n🌐 Validating DNS Configuration...', 'info');
    
    const provider = process.env.DNS_PROVIDER || 'vercel';
    this.log(`📡 DNS Provider: ${provider}`, 'info');
    
    this.checkRequired('DOMAIN', 'Primary domain');
    this.checkRequired('DOCS_SUBDOMAIN', 'Documentation subdomain');
    this.checkRequired('DOCS_DOMAIN', 'Full documentation domain');
    
    if (provider === 'cloudflare') {
      this.checkRequired('CLOUDFLARE_EMAIL', 'Cloudflare account email');
      this.checkRequired('CLOUDFLARE_API_KEY', 'Cloudflare API key');
      this.checkOptional('CLOUDFLARE_ZONE_ID', 'Cloudflare zone ID');
    }
  }

  validateSecurity() {
    this.log('\n🔐 Validating Security Configuration...', 'info');
    
    const jwtSecret = process.env.JWT_SECRET;
    const sessionSecret = process.env.SESSION_SECRET;
    
    if (!jwtSecret || jwtSecret.includes('your-')) {
      this.log('❌ JWT_SECRET: Missing or placeholder (security risk)', 'error');
      this.log('💡 Generate with: openssl rand -base64 32', 'info');
    } else if (jwtSecret.length < 32) {
      this.log('⚠️  JWT_SECRET: Too short (should be 32+ characters)', 'warning');
    } else {
      this.log('✅ JWT_SECRET: Properly configured', 'success');
    }
    
    if (!sessionSecret || sessionSecret.includes('your-')) {
      this.log('❌ SESSION_SECRET: Missing or placeholder (security risk)', 'error');
      this.log('💡 Generate with: openssl rand -base64 32', 'info');
    } else if (sessionSecret.length < 32) {
      this.log('⚠️  SESSION_SECRET: Too short (should be 32+ characters)', 'warning');
    } else {
      this.log('✅ SESSION_SECRET: Properly configured', 'success');
    }
  }

  validateFeatureFlags() {
    this.log('\n🎛️  Validating Feature Flags...', 'info');
    
    const features = {
      'FEATURE_NFT_MARKETPLACE': 'NFT Marketplace',
      'FEATURE_CRYPTO_PAYMENTS': 'Cryptocurrency Payments',
      'FEATURE_WEB3_WALLET': 'Web3 Wallet Integration',
      'FEATURE_ADMIN_DASHBOARD': 'Admin Dashboard',
      'FEATURE_ANALYTICS_DASHBOARD': 'Analytics Dashboard',
      'FEATURE_SOCIAL_LOGIN': 'Social Media Login'
    };
    
    Object.entries(features).forEach(([key, description]) => {
      const value = process.env[key];
      const enabled = value === 'true';
      this.log(`${enabled ? '🟢' : '🔴'} ${description}: ${enabled ? 'Enabled' : 'Disabled'}`, 'info');
    });
  }

  validateDonation() {
    this.log('\n💝 Validating Donation Configuration...', 'info');
    
    const address = process.env.SOLANA_DONATION_ADDRESS;
    const enabled = process.env.DONATION_ENABLED === 'true';
    
    if (address && address !== 'h4shed.sol') {
      this.log('⚠️  SOLANA_DONATION_ADDRESS: Custom address configured', 'warning');
    } else if (address === 'h4shed.sol') {
      this.log('✅ SOLANA_DONATION_ADDRESS: Using default h4shed.sol', 'success');
    }
    
    this.log(`${enabled ? '🟢' : '🔴'} Donations: ${enabled ? 'Enabled' : 'Disabled'}`, 'info');
  }

  checkFileExists() {
    this.log('\n📁 Checking Environment Files...', 'info');
    
    const envLocal = fs.existsSync('.env.local');
    const envExample = fs.existsSync('.env.local.example');
    const oldEnv = fs.existsSync('.env');
    
    if (envLocal) {
      this.log('✅ .env.local: Found', 'success');
    } else {
      this.log('❌ .env.local: Missing (copy from .env.local.example)', 'error');
    }
    
    if (envExample) {
      this.log('✅ .env.local.example: Found', 'success');
    } else {
      this.log('⚠️  .env.local.example: Missing template file', 'warning');
    }
    
    if (oldEnv) {
      this.log('⚠️  .env: Old environment file found (consider removing)', 'warning');
    }
  }

  generateReport() {
    this.log('\n📊 Validation Summary', 'info');
    console.log('='.repeat(50));
    
    console.log(`${colors.green}✅ Success: ${this.success.length}${colors.reset}`);
    console.log(`${colors.yellow}⚠️  Warnings: ${this.warnings.length}${colors.reset}`);
    console.log(`${colors.red}❌ Errors: ${this.errors.length}${colors.reset}`);
    console.log(`${colors.blue}ℹ️  Info: ${this.info.length}${colors.reset}`);
    
    if (this.errors.length === 0) {
      this.log('\n🎉 Environment validation passed!', 'success');
      this.log('Your configuration is ready for deployment.', 'success');
    } else {
      this.log('\n🚨 Environment validation failed!', 'error');
      this.log('Please fix the errors above before deploying.', 'error');
    }
    
    if (this.warnings.length > 0) {
      this.log('\n💡 Consider addressing the warnings for optimal configuration.', 'info');
    }
    
    return this.errors.length === 0;
  }

  run() {
    console.log(`${colors.magenta}
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║        🔍 Its Different Productions Environment Validator     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
${colors.reset}`);
    
    this.checkFileExists();
    this.validateCore();
    this.validateSupabase();
    this.validateVercel();
    this.validateDNS();
    this.validateSecurity();
    this.validateFeatureFlags();
    this.validateDonation();
    
    const passed = this.generateReport();
    
    if (!passed) {
      process.exit(1);
    }
  }
}

// Run validation
if (require.main === module) {
  const validator = new EnvironmentValidator();
  validator.run();
}

module.exports = EnvironmentValidator;
