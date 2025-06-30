import type { Service } from './types';
import type { ICoolifyService } from './interfaces';

export class CoolifyService implements ICoolifyService {
  async install(host: string): Promise<void> {
    console.log(`Installing Coolify on ${host}`);
    // Placeholder for actual installation
  }

  async addService(host: string, service: Service): Promise<void> {
    console.log(`Adding ${service} to ${host}`);
    // Placeholder for actual service addition
  }
}
