import { z } from 'zod'

/**
 * Provision phases that define the deployment lifecycle
 */
export const ProvisionPhase = z.enum([
  'initializing',
  'validating',
  'provisioning_infrastructure',
  'installing_services',
  'configuring_platform',
  'finalizing',
  'completed',
  'failed',
])

export type ProvisionPhase = z.infer<typeof ProvisionPhase>

/**
 * Cloud provider options
 */
export const CloudProvider = z.enum([
  'aws',
  'digitalocean',
  'vultr',
  'linode',
  'hetzner',
])

export type CloudProvider = z.infer<typeof CloudProvider>

/**
 * Platform service options
 * Currently only Coolify is supported, but designed for future extensibility
 */
export const PlatformService = z.enum([
  'coolify',
  // Future services will be added here:
  // 'dokku',
  // 'caprover',
])

export type PlatformService = z.infer<typeof PlatformService>

/**
 * Provision request DTO
 */
export const ProvisionRequestSchema = z.object({
  id: z.string().uuid(),
  cloud: CloudProvider,
  service: PlatformService,
  region: z.string().min(1),
  size: z.string().min(1),
  name: z.string().min(1).max(50),
  domain: z.string().optional(),
  sshKey: z.string().optional(),
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
