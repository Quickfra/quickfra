import type { DeploymentConfig, DeploymentResult } from '../types';
import { SERVICE_SUBDOMAINS } from '../types';
import type { IDeploymentService, ICoolifyService } from '../interfaces';
import { DockerComposeService } from './docker-compose';

export class DeploymentService implements IDeploymentService {
  constructor(private coolifyService: ICoolifyService) {}

  async deploy(config: DeploymentConfig): Promise<DeploymentResult> {
    const id = this.generateId();
    
    try {
      // Provision VM (placeholder)
      const host = 'placeholder.example.com';
      
      // Install Coolify
      const adminSubdomain = config.adminSubdomain || 'admin';
      await this.coolifyService.install(host, config.domain, adminSubdomain);
      
      // Generate service URLs and add services
      const urls: Record<string, string> = { 
        coolify: `https://${adminSubdomain}.${config.domain}` 
      };
      
      for (const service of config.services) {
        const subdomain = config.customSubdomains?.[service] || SERVICE_SUBDOMAINS[service];
        const serviceUrl = `${subdomain}.${config.domain}`;
        const dockerCompose = DockerComposeService.getComposeConfig(service, config.domain);
        await this.coolifyService.addService(host, service, serviceUrl, dockerCompose);
        urls[service] = `https://${serviceUrl}`;
      }
      
      return {
        id,
        status: 'running',
        urls
      };
    } catch (error) {
      return {
        id,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  async getStatus(_deploymentId: string): Promise<string> {
    // Placeholder
    return 'running';
  }

  private generateId(): string {
    return `deploy_${Date.now()}`;
  }
}
