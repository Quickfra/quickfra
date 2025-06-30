import { readFileSync } from 'fs';
import { join } from 'path';
import type { Service } from '../types';

export class DockerComposeService {
  private static getComposePath(service: Service): string {
    return join(__dirname, '..', 'docker-compose', `${service}.yml`);
  }

  static getComposeConfig(service: Service): string {
    try {
      const composePath = this.getComposePath(service);
      return readFileSync(composePath, 'utf-8');
    } catch (error) {
      throw new Error(`Failed to load Docker Compose for service: ${service}`);
    }
  }

  static getAllComposeConfigs(): Record<Service, string> {
    const services: Service[] = ['webmail', 'mail', 'status', 'n8n', 'postgres', 'redis'];
    const configs: Record<Service, string> = {} as Record<Service, string>;
    
    for (const service of services) {
      configs[service] = this.getComposeConfig(service);
    }
    
    return configs;
  }
}
