import { describe, it, expect } from 'vitest';
import { CloudService } from '../services/cloud';

describe('CloudService', () => {
  it('should return AWS regions', async () => {
    const cloudService = new CloudService();
    const regions = await cloudService.getRegions('aws');
    
    expect(regions).toContain('us-east-1');
    expect(regions).toContain('us-west-2');
    expect(regions.length).toBeGreaterThan(0);
  });

  it('should return different regions for different providers', async () => {
    const cloudService = new CloudService();
    const awsRegions = await cloudService.getRegions('aws');
    const digitalOceanRegions = await cloudService.getRegions('digitalocean');
    
    expect(awsRegions).not.toEqual(digitalOceanRegions);
    expect(digitalOceanRegions).toContain('nyc1');
  });
});
