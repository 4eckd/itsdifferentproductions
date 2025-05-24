#!/usr/bin/env node

/**
 * Automated DNS Configuration Script for docs.itsdifferentproductions.com
 * This script configures DNS records for the documentation site
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  domain: 'itsdifferentproductions.com',
  subdomain: 'docs',
  fullDomain: 'docs.itsdifferentproductions.com',
  vercelTarget: 'cname.vercel-dns.com',
  // DNS provider configuration
  dnsProvider: process.env.DNS_PROVIDER || 'vercel',

  // Vercel configuration
  vercelToken: process.env.VERCEL_TOKEN,
  vercelTeamId: process.env.VERCEL_ORG_ID,
  vercelProjectId: process.env.VERCEL_DOCS_PROJECT_ID,

  // Cloudflare configuration
  cloudflareEmail: process.env.CLOUDFLARE_EMAIL,
  cloudflareApiKey: process.env.CLOUDFLARE_API_KEY,
  cloudflareZoneId: process.env.CLOUDFLARE_ZONE_ID,

  // Namecheap configuration
  namecheapApiUser: process.env.NAMECHEAP_API_USER,
  namecheapApiKey: process.env.NAMECHEAP_API_KEY,
  namecheapClientIp: process.env.NAMECHEAP_CLIENT_IP,

  // GoDaddy configuration
  godaddyApiKey: process.env.GODADDY_API_KEY,
  godaddyApiSecret: process.env.GODADDY_API_SECRET
};

class DNSConfigurator {
  constructor(config) {
    this.config = config;
    this.logFile = path.join(__dirname, '../logs/dns-setup.log');
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    const logDir = path.dirname(this.logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }

  log(message, level = 'INFO') {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${message}\n`;

    console.log(logMessage.trim());
    fs.appendFileSync(this.logFile, logMessage);
  }

  async makeRequest(options, data = null) {
    return new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          try {
            const response = JSON.parse(body);
            resolve({ status: res.statusCode, data: response });
          } catch (e) {
            resolve({ status: res.statusCode, data: body });
          }
        });
      });

      req.on('error', reject);

      if (data) {
        req.write(JSON.stringify(data));
      }

      req.end();
    });
  }

  async setupVercelDomain() {
    this.log('Setting up Vercel domain configuration...');

    if (!this.config.vercelToken) {
      throw new Error('VERCEL_TOKEN environment variable is required');
    }

    // Add domain to Vercel project
    const addDomainOptions = {
      hostname: 'api.vercel.com',
      path: `/v9/projects/${this.config.vercelProjectId}/domains`,
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.vercelToken}`,
        'Content-Type': 'application/json'
      }
    };

    const domainData = {
      name: this.config.fullDomain
    };

    try {
      const response = await this.makeRequest(addDomainOptions, domainData);

      if (response.status === 200 || response.status === 409) {
        this.log(`Domain ${this.config.fullDomain} added to Vercel project`);
        return response.data;
      } else {
        throw new Error(`Failed to add domain: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.log(`Error adding domain to Vercel: ${error.message}`, 'ERROR');
      throw error;
    }
  }

  async configureVercelDNS() {
    this.log('Configuring Vercel DNS records...');

    // Get domain configuration from Vercel
    const getDomainOptions = {
      hostname: 'api.vercel.com',
      path: `/v6/domains/${this.config.fullDomain}/config`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.config.vercelToken}`
      }
    };

    try {
      const response = await this.makeRequest(getDomainOptions);

      if (response.status === 200) {
        this.log('Vercel DNS configuration retrieved successfully');
        return response.data;
      } else {
        throw new Error(`Failed to get domain config: ${JSON.stringify(response.data)}`);
      }
    } catch (error) {
      this.log(`Error getting Vercel DNS config: ${error.message}`, 'ERROR');
      throw error;
    }
  }

  async configureCloudflare() {
    this.log('Configuring Cloudflare DNS...');

    if (!this.config.cloudflareEmail || !this.config.cloudflareApiKey) {
      throw new Error('Cloudflare API credentials required');
    }

    // Get zone ID if not provided
    let zoneId = this.config.cloudflareZoneId;

    if (!zoneId) {
      const getZoneOptions = {
        hostname: 'api.cloudflare.com',
        path: `/client/v4/zones?name=${this.config.domain}`,
        method: 'GET',
        headers: {
          'X-Auth-Email': this.config.cloudflareEmail,
          'X-Auth-Key': this.config.cloudflareApiKey,
          'Content-Type': 'application/json'
        }
      };

      const zoneResponse = await this.makeRequest(getZoneOptions);

      if (!zoneResponse.data.success || zoneResponse.data.result.length === 0) {
        throw new Error('Domain not found in Cloudflare');
      }

      zoneId = zoneResponse.data.result[0].id;
      this.log(`Found Cloudflare zone ID: ${zoneId}`);
    } else {
      this.log(`Using provided Cloudflare zone ID: ${zoneId}`);
    }

    // Create CNAME record
    const createRecordOptions = {
      hostname: 'api.cloudflare.com',
      path: `/client/v4/zones/${zoneId}/dns_records`,
      method: 'POST',
      headers: {
        'X-Auth-Email': this.config.cloudflareEmail,
        'X-Auth-Key': this.config.cloudflareApiKey,
        'Content-Type': 'application/json'
      }
    };

    const recordData = {
      type: 'CNAME',
      name: this.config.subdomain,
      content: this.config.vercelTarget,
      ttl: 1 // Auto TTL
    };

    const recordResponse = await this.makeRequest(createRecordOptions, recordData);

    if (recordResponse.data.success) {
      this.log(`CNAME record created successfully for ${this.config.fullDomain}`);
      return recordResponse.data.result;
    } else {
      throw new Error(`Failed to create DNS record: ${JSON.stringify(recordResponse.data.errors)}`);
    }
  }

  async configureNamecheap() {
    this.log('Configuring Namecheap DNS...');

    // Note: Namecheap API requires XML format and different authentication
    // This is a simplified example - you may need to adjust based on your setup

    const apiUrl = `https://api.namecheap.com/xml.response?ApiUser=${this.config.apiKey}&ApiKey=${this.config.apiSecret}&UserName=${this.config.apiKey}&Command=namecheap.domains.dns.setHosts&ClientIp=YOUR_IP&SLD=${this.config.domain.split('.')[0]}&TLD=${this.config.domain.split('.')[1]}&HostName1=${this.config.subdomain}&RecordType1=CNAME&Address1=${this.config.vercelTarget}&TTL1=1800`;

    this.log('Namecheap DNS configuration requires manual setup or XML API integration');
    this.log(`Please add the following CNAME record manually:`);
    this.log(`Host: ${this.config.subdomain}`);
    this.log(`Points to: ${this.config.vercelTarget}`);
    this.log(`TTL: 1800`);
  }

  generateDNSInstructions() {
    const instructions = {
      cloudflare: {
        type: 'CNAME',
        name: this.config.subdomain,
        content: this.config.vercelTarget,
        ttl: 'Auto'
      },
      namecheap: {
        type: 'CNAME',
        host: this.config.subdomain,
        value: this.config.vercelTarget,
        ttl: '1800'
      },
      godaddy: {
        type: 'CNAME',
        name: this.config.subdomain,
        value: this.config.vercelTarget,
        ttl: '1 Hour'
      },
      generic: {
        type: 'CNAME',
        name: this.config.subdomain,
        target: this.config.vercelTarget,
        ttl: '3600'
      }
    };

    const instructionsFile = path.join(__dirname, '../docs/dns-instructions.md');
    let content = `# DNS Configuration Instructions for ${this.config.fullDomain}\n\n`;

    content += `## Automatic Configuration\n\n`;
    content += `This script attempted to configure DNS automatically. If manual configuration is needed, use the instructions below.\n\n`;

    Object.entries(instructions).forEach(([provider, config]) => {
      content += `## ${provider.charAt(0).toUpperCase() + provider.slice(1)}\n\n`;
      content += `\`\`\`\n`;
      Object.entries(config).forEach(([key, value]) => {
        content += `${key}: ${value}\n`;
      });
      content += `\`\`\`\n\n`;
    });

    content += `## Verification\n\n`;
    content += `After DNS propagation (usually 5-30 minutes), verify the configuration:\n\n`;
    content += `\`\`\`bash\n`;
    content += `# Check DNS resolution\n`;
    content += `nslookup ${this.config.fullDomain}\n`;
    content += `dig ${this.config.fullDomain}\n`;
    content += `\n`;
    content += `# Test HTTPS\n`;
    content += `curl -I https://${this.config.fullDomain}\n`;
    content += `\`\`\`\n\n`;

    fs.writeFileSync(instructionsFile, content);
    this.log(`DNS instructions written to ${instructionsFile}`);
  }

  async verifyDNS() {
    this.log('Verifying DNS configuration...');

    const { exec } = require('child_process');

    return new Promise((resolve) => {
      exec(`nslookup ${this.config.fullDomain}`, (error, stdout, stderr) => {
        if (error) {
          this.log(`DNS verification failed: ${error.message}`, 'WARN');
          resolve(false);
        } else {
          this.log('DNS verification successful');
          this.log(`DNS Response: ${stdout}`);
          resolve(true);
        }
      });
    });
  }

  async run() {
    try {
      this.log('Starting DNS configuration for docs.itsdifferentproductions.com');

      // Step 1: Setup Vercel domain
      await this.setupVercelDomain();

      // Step 2: Configure DNS based on provider
      switch (this.config.dnsProvider.toLowerCase()) {
        case 'vercel':
          await this.configureVercelDNS();
          break;
        case 'cloudflare':
          await this.configureCloudflare();
          break;
        case 'namecheap':
          await this.configureNamecheap();
          break;
        default:
          this.log(`Unsupported DNS provider: ${this.config.dnsProvider}`, 'WARN');
          break;
      }

      // Step 3: Generate manual instructions
      this.generateDNSInstructions();

      // Step 4: Wait and verify
      this.log('Waiting 30 seconds for DNS propagation...');
      await new Promise(resolve => setTimeout(resolve, 30000));

      const verified = await this.verifyDNS();

      if (verified) {
        this.log('DNS configuration completed successfully!', 'SUCCESS');
      } else {
        this.log('DNS configuration may need more time to propagate', 'WARN');
      }

      // Step 5: Output next steps
      this.log('\n=== NEXT STEPS ===');
      this.log('1. Wait 5-30 minutes for full DNS propagation');
      this.log('2. Visit https://docs.itsdifferentproductions.com to verify');
      this.log('3. Check Vercel dashboard for SSL certificate status');
      this.log('4. Deploy documentation files to the domain');

    } catch (error) {
      this.log(`DNS configuration failed: ${error.message}`, 'ERROR');
      this.log('Please check the generated instructions for manual setup');
      process.exit(1);
    }
  }
}

// Run the script
if (require.main === module) {
  const configurator = new DNSConfigurator(CONFIG);
  configurator.run().catch(console.error);
}

module.exports = DNSConfigurator;
