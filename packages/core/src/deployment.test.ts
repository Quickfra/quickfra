import { describe, it, expect } from 'vitest';
import { DeploymentService } from './deployment';
import { CoolifyService } from './coolify';

describe('DeploymentService', () => {
  it('should deploy successfully', async () => {
    const coolifyService = new CoolifyService();
    const deploymentService = new DeploymentService(coolifyService);
    
    const config = {
      cloud: 'aws' as const,
      services: ['postgres' as const],
    };
    
    const result = await deploymentService.deploy(config);
    
    expect(result.status).toBe('running');
    expect(result.id).toMatch(/^deploy_/);
  });
});
