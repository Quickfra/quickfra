import type { CloudProvider } from '../types';
import type { ICloudService } from '../interfaces';

export class CloudService implements ICloudService {
  async getRegions(provider: CloudProvider): Promise<string[]> {
    const regionMap: Record<CloudProvider, string[]> = {
      aws: ['us-east-1', 'us-west-2', 'eu-west-1'],
      oci: ['us-ashburn-1', 'us-phoenix-1', 'eu-frankfurt-1'],
      digitalocean: ['nyc1', 'nyc3', 'sfo3', 'lon1'],
      hetzner: ['nbg1', 'fsn1', 'hel1'],
    };
    
    return regionMap[provider] || [];
  }
}
