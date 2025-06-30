export interface ProviderOpts {
  region?: string;
  instanceType?: string;
  sshKeyName?: string;
  metadata?: Record<string, string>;
}

export interface ProvisionResult {
  id: string;
  ip: string;
  region: string;
  status: 'provisioning' | 'running' | 'stopped' | 'terminated';
  metadata?: Record<string, string>;
}

export interface IProvider {
  /**
   * Provision a new VM instance
   */
  provision(opts: ProviderOpts): Promise<ProvisionResult>;
  
  /**
   * Destroy an existing VM instance
   */
  destroy(id: string): Promise<void>;
}
