import type { IAddon, AddonOpts, ProvisionResult } from '@quickfra/core';

export class MockAddon implements IAddon {
  constructor(public readonly name: string) {}

  async install(ctx: ProvisionResult, opts: AddonOpts): Promise<void> {
    // Simulate addon installation within Coolify
    await new Promise(resolve => setTimeout(resolve, 150));

    console.log(`Installing addon "${this.name}" in Coolify on ${ctx.ip}`);
    
    if (opts.version) {
      console.log(`  Version: ${opts.version}`);
    }
    
    if (opts.config && Object.keys(opts.config).length > 0) {
      console.log(`  Configuration keys: ${Object.keys(opts.config).join(', ')}`);
    }

    if (opts.environment && Object.keys(opts.environment).length > 0) {
      console.log(`  Environment variables: ${Object.keys(opts.environment).length}`);
    }

    console.log(`✓ Addon "${this.name}" installed successfully in Coolify`);
  }
}

// Predefined mock addons for common use cases
export const mockAddons = {
  mail: new MockAddon('mail'),
  status: new MockAddon('status'),
  monitoring: new MockAddon('monitoring'),
  backup: new MockAddon('backup'),
} as const;
