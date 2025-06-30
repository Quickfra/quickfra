import type { CloudProvider, Service, DeploymentConfig, DeploymentResult } from './types';

export interface IDeploymentService {
  deploy(config: DeploymentConfig): Promise<DeploymentResult>;
  getStatus(deploymentId: string): Promise<string>;
}

export interface ICloudService {
  getRegions(provider: CloudProvider): Promise<string[]>;
}

export interface ICoolifyService {
  install(host: string, domain: string): Promise<void>;
  addService(host: string, service: Service, serviceUrl: string): Promise<void>;
}
