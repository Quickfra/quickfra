import { z } from 'zod';

/**
 * Cloud provider configuration schema
 */
export const CloudProviderSchema = z.enum(['aws', 'oci', 'azure', 'gcp']);

/**
 * Available services schema
 */
export const ServicesSchema = z.enum(['coolify', 'mail', 'status', 'vault', 'prometheus']);

/**
 * Deployment configuration schema
 */
export const DeploymentConfigSchema = z.object({
  cloud: CloudProviderSchema,
  services: z.array(ServicesSchema),
  region: z.string().optional(),
  domain: z.string().optional(),
  projectName: z.string().default('quickfra-stack'),
  environment: z.enum(['dev', 'staging', 'prod']).default('dev'),
});

/**
 * CLI configuration schema for up command
 */
export const UpCommandConfigSchema = z.object({
  cloud: CloudProviderSchema,
  services: z.array(ServicesSchema),
  region: z.string().optional(),
  domain: z.string().optional(),
  'project-name': z.string().optional(),
  environment: z.enum(['dev', 'staging', 'prod']).optional(),
  'dry-run': z.boolean().default(false),
  verbose: z.boolean().default(false),
});

export type CloudProvider = z.infer<typeof CloudProviderSchema>;
export type Services = z.infer<typeof ServicesSchema>;
export type DeploymentConfig = z.infer<typeof DeploymentConfigSchema>;
export type UpCommandConfig = z.infer<typeof UpCommandConfigSchema>;
