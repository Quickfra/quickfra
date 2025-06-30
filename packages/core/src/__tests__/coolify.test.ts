import { describe, it, expect } from 'vitest';
import { CoolifyService } from '../services/coolify';

describe('CoolifyService', () => {
  it('should install coolify with domain', async () => {
    const coolifyService = new CoolifyService();
    
    await expect(
      coolifyService.install('test.host.com', 'example.com')
    ).resolves.not.toThrow();
  });

  it('should add service with service URL', async () => {
    const coolifyService = new CoolifyService();
    
    await expect(
      coolifyService.addService('test.host.com', 'n8n', 'n8n.example.com')
    ).resolves.not.toThrow();
  });
});
