// Cloud providers
export type CloudProvider = 'aws' | 'oci' | 'digitalocean' | 'hetzner';

// Available services
export type Service = 'webmail' | 'mail' | 'status' | 'n8n' | 'postgres' | 'redis';

// Deployment config
export interface DeploymentConfig {
  cloud: CloudProvider;
  services: Service[];
  domain?: string;
  region?: string;
}

// Deployment result
export interface DeploymentResult {
  id: string;
  status: 'pending' | 'running' | 'error';
  urls?: Record<string, string>;
  error?: string;
}
