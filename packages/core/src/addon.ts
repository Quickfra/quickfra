import type { ProvisionResult } from './provider.js';

export interface AddonOpts {
  version?: string;
  config?: Record<string, string>;
  environment?: Record<string, string>;
}

export interface IAddon {
  /**
   * The name of the addon
   */
  readonly name: string;
  
  /**
   * Install an addon within Coolify
   */
  install(ctx: ProvisionResult, opts: AddonOpts): Promise<void>;
}
