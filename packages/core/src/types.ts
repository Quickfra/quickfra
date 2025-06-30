// Cloud providers
export type CloudProvider = 'aws' | 'oci' | 'digitalocean' | 'hetzner';

// Available services
export type Service = 'webmail' | 'mail' | 'status' | 'n8n' | 'postgres' | 'redis';

// Service domain mappings
export const SERVICE_SUBDOMAINS: Record<Service, string> = {
  webmail: 'webmail',
  mail: 'mail', 
  status: 'status',
  n8n: 'n8n',
  postgres: 'postgres',
  redis: 'redis'
};

// Deployment config
export interface DeploymentConfig {
  cloud: CloudProvider;
  services: Service[];
  domain: string;
  region?: string;
  customSubdomains?: Partial<Record<Service, string>>;
}

// Deployment result
export interface DeploymentResult {
  id: string;
  status: 'pending' | 'running' | 'error';
  urls?: Record<string, string>;
  error?: string;
}
