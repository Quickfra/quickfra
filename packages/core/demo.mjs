#!/usr/bin/env node

/**
 * Updated Quickfra demo showing the new Coolify bootstrap + addon architecture
 */

import { MockProvider } from '../provider-mock/dist/index.js';
import { mockAddons } from '../addon-mock/dist/index.js';
import { bootstrap, logger } from './dist/index.js';

async function runDemo() {
  logger.info('Starting Quickfra bootstrap demo');

  // Initialize provider
  const provider = new MockProvider();

  try {
    // Provision a VM
    logger.info('Provisioning VM...');
    const instance = await provider.provision({
      region: 'eu-west-1',
      instanceType: 't3.large',
      sshKeyName: 'demo-key',
      metadata: { project: 'quickfra-bootstrap-demo' },
    });

    logger.info('VM provisioned successfully', { 
      id: instance.id, 
      ip: instance.ip,
      region: instance.region 
    });

    // Bootstrap: Install Coolify + addons
    logger.info('Starting bootstrap process...');
    await bootstrap(instance, {
      coolifyVersion: '4.0.0',
      coolifyConfig: {
        domain: 'coolify.demo.local',
        ssl: 'true',
      },
      coolifyEnvironment: {
        NODE_ENV: 'production',
        COOLIFY_SECRET: 'super-secret-key',
        DOMAIN: 'coolify.demo.local',
      },
      addons: [
        mockAddons.mail,          // Email service
        mockAddons.status,        // Status page
        mockAddons.monitoring,    // Monitoring
        mockAddons.mail,          // Duplicate (will be filtered)
        mockAddons.backup,        // Backup service
      ],
    });

    logger.info('Bootstrap completed successfully!');
    logger.info('Coolify is running with all selected addons installed');

    // Cleanup
    logger.info('Cleaning up...');
    await provider.destroy(instance.id);
    logger.info('VM destroyed successfully');

  } catch (error) {
    logger.error('Bootstrap demo failed', { error: error.message });
    process.exit(1);
  }
}

runDemo().catch(console.error);
