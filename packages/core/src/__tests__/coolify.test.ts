import { describe, it, expect } from 'vitest';
import { CoolifyService } from '../services/coolify';
import { DockerComposeService } from '../services/docker-compose';

describe('CoolifyService', () => {
  it('should install coolify with domain and admin subdomain', async () => {
    const coolifyService = new CoolifyService();
    
    await expect(
      coolifyService.install('test.host.com', 'example.com', 'admin')
    ).resolves.not.toThrow();
  });

  it('should add service with service URL and docker compose config', async () => {
    const coolifyService = new CoolifyService();
    const dockerConfig = DockerComposeService.getComposeConfig('n8n');
    
    await expect(
      coolifyService.addService('test.host.com', 'n8n', 'n8n.example.com', dockerConfig)
    ).resolves.not.toThrow();
  });
});
