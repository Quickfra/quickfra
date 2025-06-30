import { z } from 'zod'

/**
 * Provision phases that define the deployment lifecycle
 */
export const ProvisionPhase = z.enum([
  'initializing',
  'validating',
  'provisioning_infrastructure', // Creates VPC/K8s
  'installing_platform',         // Helm: Coolify (always installed)
  'installing_addons',           // Calls Coolify API for add-ons
  'finalizing',
  'completed',
  'failed',
])

export type ProvisionPhase = z.infer<typeof ProvisionPhase>

/**
 * Cloud provider options where Coolify can be hosted
 */
export const CloudProvider = z.enum([
  'aws',
  'oci', 
  'digitalocean',
  'hetzner',
])

export type CloudProvider = z.infer<typeof CloudProvider>

/**
 * Add-on services managed BY Coolify platform
 * These are installed via Coolify's API after the platform is ready
 */
export const AddonService = z.enum([
  'mail',      // Stalwart Mail + Snappymail
  'database',  // PostgreSQL (MySQL in future)
  'n8n',      // Workflow automation
  'status',   // Uptime Kuma monitoring
])

export type AddonService = z.infer<typeof AddonService>

/**
 * Provision request DTO
 */
export const ProvisionRequestSchema = z.object({
  id: z.string().uuid(),
  cloud: CloudProvider,
  region: z.string().min(1),
  size: z.string().min(1),        // Machine/node plan
  name: z.string().min(1).max(50), // "acme-prod"
  domain: z.string().optional(),   // Root FQDN
  sshKey: z.string().optional(),   // Initial SSH key
  /** Add-ons that Coolify should deploy (can be [] = panel only) */
  addons: z.array(AddonService).default([]),
  metadata: z.record(z.string(), z.unknown()).default({}),
  createdAt: z.date().default(() => new Date()),
})

export type ProvisionRequest = z.infer<typeof ProvisionRequestSchema>

/**
 * Provision status DTO
 */
export const ProvisionStatusSchema = z.object({
  id: z.string().uuid(),
  requestId: z.string().uuid(),
  phase: ProvisionPhase,
  progress: z.number().min(0).max(100),
  message: z.string(),
  details: z.record(z.string(), z.unknown()).default({}),
  error: z.string().optional(),
  startedAt: z.date(),
  updatedAt: z.date(),
  completedAt: z.date().optional(),
})

export type ProvisionStatus = z.infer<typeof ProvisionStatusSchema>

/**
 * Provision event DTO
 */
export const ProvisionEventSchema = z.object({
  id: z.string().uuid(),
  requestId: z.string().uuid(),
  type: z.enum(['phase_started', 'phase_completed', 'phase_failed', 'progress_updated']),
  phase: ProvisionPhase,
  progress: z.number().min(0).max(100),
  message: z.string(),
  details: z.record(z.string(), z.unknown()).default({}),
  error: z.string().optional(),
  timestamp: z.date().default(() => new Date()),
})

export type ProvisionEvent = z.infer<typeof ProvisionEventSchema>

/**
 * Provision result DTO
 */
export const ProvisionResultSchema = z.object({
  id: z.string().uuid(),
  requestId: z.string().uuid(),
  success: z.boolean(),
  phase: ProvisionPhase,
  serverIp: z.string().ip().optional(),
  dashboardUrl: z.string().url().optional(),
  credentials: z.record(z.string(), z.string()).default({}),
  metadata: z.record(z.string(), z.unknown()).default({}),
  error: z.string().optional(),
  duration: z.number().positive().optional(),
  completedAt: z.date(),
})

export type ProvisionResult = z.infer<typeof ProvisionResultSchema>
