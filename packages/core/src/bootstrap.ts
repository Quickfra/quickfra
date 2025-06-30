import type { ProvisionResult } from './provider.js';
import type { IAddon } from './addon.js';
import { logger } from './utils/logger.js';

export interface BootstrapOpts {
  addons?: IAddon[];
  coolifyVersion?: string;
  coolifyConfig?: Record<string, string>;
  coolifyEnvironment?: Record<string, string>;
}

export class CoolifyInstaller {
  static async run(ctx: ProvisionResult, opts?: {
    version?: string;
    config?: Record<string, string>;
    environment?: Record<string, string>;
  }): Promise<void> {
    logger.info('Installing Coolify on VM', { 
      instanceId: ctx.id, 
      ip: ctx.ip,
      version: opts?.version || 'latest'
    });

    // Simulate Coolify installation
    await new Promise(resolve => setTimeout(resolve, 200));

    logger.info('✓ Coolify installed successfully', {
      instanceId: ctx.id,
      version: opts?.version || 'latest'
    });
  }
}

export async function bootstrap(ctx: ProvisionResult, opts: BootstrapOpts = {}): Promise<void> {
  logger.info('Starting Quickfra bootstrap process', { instanceId: ctx.id });

  try {
    // Always install Coolify first
    await CoolifyInstaller.run(ctx, {
      ...(opts.coolifyVersion && { version: opts.coolifyVersion }),
      ...(opts.coolifyConfig && { config: opts.coolifyConfig }),
      ...(opts.coolifyEnvironment && { environment: opts.coolifyEnvironment }),
    });

    // Install addons if provided
    if (opts.addons && opts.addons.length > 0) {
      // Deduplicate addons by name while preserving order
      const uniqueAddons = opts.addons.filter((addon, index) => 
        opts.addons!.findIndex(a => a.name === addon.name) === index
      );

      logger.info(`Installing ${uniqueAddons.length} addon(s)`, {
        addons: uniqueAddons.map(a => a.name)
      });

      for (const addon of uniqueAddons) {
        logger.info(`Installing addon: ${addon.name}`);
        await addon.install(ctx, {
          ...(opts.coolifyVersion && { version: opts.coolifyVersion }),
          ...(opts.coolifyConfig && { config: opts.coolifyConfig }),
          ...(opts.coolifyEnvironment && { environment: opts.coolifyEnvironment }),
        });
      }
    }

    logger.info('✓ Bootstrap process completed successfully', { instanceId: ctx.id });
  } catch (error) {
    logger.error('Bootstrap process failed', { 
      instanceId: ctx.id, 
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}
