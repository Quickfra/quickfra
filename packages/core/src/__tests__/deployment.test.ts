import { describe, it, expect } from 'vitest';
import { DeploymentService } from '../services/deployment';
import { CoolifyService } from '../services/coolify';

describe('DeploymentService', () => {
  it('should deploy successfully', async () => {
    const coolifyService = new CoolifyService();
    const deploymentService = new DeploymentService(coolifyService);
    
    const config = {
      cloud: 'aws' as const,
      services: ['postgres' as const],
      domain: 'justdiego.com'
    };
    
    const result = await deploymentService.deploy(config);
    
    expect(result.status).toBe('running');
    expect(result.id).toMatch(/^deploy_/);
    expect(result.urls?.['postgres']).toBe('https://postgres.justdiego.com');
  });

  it('should use custom subdomains when provided', async () => {
    const coolifyService = new CoolifyService();
    const deploymentService = new DeploymentService(coolifyService);
    
    const config = {
      cloud: 'aws' as const,
      services: ['n8n' as const],
      domain: 'justdiego.com',
      customSubdomains: { n8n: 'automation' }
    };
    
    const result = await deploymentService.deploy(config);
    
    expect(result.status).toBe('running');
    expect(result.urls?.['n8n']).toBe('https://automation.justdiego.com');
  });

  it('should use custom admin subdomain when provided', async () => {
    const coolifyService = new CoolifyService();
    const deploymentService = new DeploymentService(coolifyService);
    
    const config = {
      cloud: 'aws' as const,
      services: ['n8n' as const],
      domain: 'justdiego.com',
      adminSubdomain: 'panel'
    };
    
    const result = await deploymentService.deploy(config);
    
    expect(result.status).toBe('running');
    expect(result.urls?.['coolify']).toBe('https://panel.justdiego.com');
  });

  it('should use default admin subdomain when not provided', async () => {
    const coolifyService = new CoolifyService();
    const deploymentService = new DeploymentService(coolifyService);
    
    const config = {
      cloud: 'aws' as const,
      services: ['n8n' as const],
      domain: 'justdiego.com'
    };
    
    const result = await deploymentService.deploy(config);
    
    expect(result.status).toBe('running');
    expect(result.urls?.['coolify']).toBe('https://admin.justdiego.com');
  });

  it('should template domain in docker compose configs', async () => {
    const coolifyService = new CoolifyService();
    const deploymentService = new DeploymentService(coolifyService);
    
    const config = {
      cloud: 'aws' as const,
      services: ['mail' as const],
      domain: 'testdomain.com'
    };
    
    const result = await deploymentService.deploy(config);
    
    expect(result.status).toBe('running');
    expect(result.urls?.['mail']).toBe('https://mail.testdomain.com');
  });
});
