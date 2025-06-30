import { describe, it, expect } from 'vitest';
import { CoolifyService } from '../services/coolify';
import { SERVICE_DOCKER_CONFIGS } from '../types';

describe('CoolifyService', () => {
  it('should install coolify with domain and admin subdomain', async () => {
    const coolifyService = new CoolifyService();
    
    await expect(
      coolifyService.install('test.host.com', 'example.com', 'admin')
    ).resolves.not.toThrow();
  });

  it('should add service with service URL and docker compose config', async () => {
    const coolifyService = new CoolifyService();
    const dockerConfig = SERVICE_DOCKER_CONFIGS['n8n'];
    
    await expect(
      coolifyService.addService('test.host.com', 'n8n', 'n8n.example.com', dockerConfig)
    ).resolves.not.toThrow();
  });
});
