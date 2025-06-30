import { 
  ProvisionRequestSchema,
  ProvisionStatusSchema,
  ProvisionEventSchema,
  ProvisionResultSchema,
  CloudProvider,
  PlatformService,
  ProvisionPhase
} from '../types'

describe('Provision DTOs', () => {
  describe('ProvisionRequestSchema', () => {
    it('should validate a complete provision request', () => {
      const validRequest = {
        id: crypto.randomUUID(),
        cloud: 'digitalocean' as CloudProvider,
        service: 'coolify' as PlatformService,
        region: 'nyc1',
        size: 's-2vcpu-4gb',
        name: 'my-stack',
        domain: 'example.com',
        sshKey: 'ssh-rsa AAAAB3NzaC1yc2E...',
        metadata: { team: 'backend' },
      }

      const result = ProvisionRequestSchema.safeParse(validRequest)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.createdAt).toBeInstanceOf(Date)
        expect(result.data.metadata).toEqual({ team: 'backend' })
      }
    })

    it('should validate minimal provision request', () => {
      const minimalRequest = {
        id: crypto.randomUUID(),
        cloud: 'aws' as CloudProvider,
        service: 'dokku' as PlatformService,
        region: 'us-east-1',
        size: 't3.micro',
        name: 'test-stack',
      }

      const result = ProvisionRequestSchema.safeParse(minimalRequest)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.metadata).toEqual({})
        expect(result.data.domain).toBeUndefined()
        expect(result.data.sshKey).toBeUndefined()
      }
    })

    it('should reject invalid cloud provider', () => {
      const invalidRequest = {
        id: crypto.randomUUID(),
        cloud: 'invalid-cloud',
        service: 'coolify' as PlatformService,
        region: 'nyc1',
        size: 's-2vcpu-4gb',
        name: 'my-stack',
      }

      const result = ProvisionRequestSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
    })

    it('should reject invalid UUID', () => {
      const invalidRequest = {
        id: 'not-a-uuid',
        cloud: 'digitalocean' as CloudProvider,
        service: 'coolify' as PlatformService,
        region: 'nyc1',
        size: 's-2vcpu-4gb',
        name: 'my-stack',
      }

      const result = ProvisionRequestSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
    })

    it('should reject empty name', () => {
      const invalidRequest = {
        id: crypto.randomUUID(),
        cloud: 'digitalocean' as CloudProvider,
        service: 'coolify' as PlatformService,
        region: 'nyc1',
        size: 's-2vcpu-4gb',
        name: '',
      }

      const result = ProvisionRequestSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
    })

    it('should reject name too long', () => {
      const invalidRequest = {
        id: crypto.randomUUID(),
        cloud: 'digitalocean' as CloudProvider,
        service: 'coolify' as PlatformService,
        region: 'nyc1',
        size: 's-2vcpu-4gb',
        name: 'a'.repeat(51), // Max is 50
      }

      const result = ProvisionRequestSchema.safeParse(invalidRequest)
      expect(result.success).toBe(false)
    })
  })

  describe('ProvisionStatusSchema', () => {
    it('should validate complete status', () => {
      const validStatus = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        phase: 'provisioning_infrastructure' as ProvisionPhase,
        progress: 40,
        message: 'Creating server instance',
        details: { serverId: 'droplet-123' },
        startedAt: new Date(),
        updatedAt: new Date(),
      }

      const result = ProvisionStatusSchema.safeParse(validStatus)
      expect(result.success).toBe(true)
    })

    it('should validate status with error', () => {
      const statusWithError = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        phase: 'failed' as ProvisionPhase,
        progress: 0,
        message: 'Failed to create server',
        details: {},
        error: 'API quota exceeded',
        startedAt: new Date(),
        updatedAt: new Date(),
        completedAt: new Date(),
      }

      const result = ProvisionStatusSchema.safeParse(statusWithError)
      expect(result.success).toBe(true)
    })

    it('should reject invalid progress values', () => {
      const invalidStatus = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        phase: 'provisioning_infrastructure' as ProvisionPhase,
        progress: 150, // Invalid: > 100
        message: 'Creating server instance',
        details: {},
        startedAt: new Date(),
        updatedAt: new Date(),
      }

      const result = ProvisionStatusSchema.safeParse(invalidStatus)
      expect(result.success).toBe(false)
    })
  })

  describe('ProvisionEventSchema', () => {
    it('should validate provision event', () => {
      const validEvent = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        type: 'phase_started' as const,
        phase: 'installing_services' as ProvisionPhase,
        progress: 70,
        message: 'Installing Coolify',
        details: { version: 'v4.0' },
      }

      const result = ProvisionEventSchema.safeParse(validEvent)
      expect(result.success).toBe(true)
      
      if (result.success) {
        expect(result.data.timestamp).toBeInstanceOf(Date)
      }
    })

    it('should validate event with error', () => {
      const eventWithError = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        type: 'phase_failed' as const,
        phase: 'failed' as ProvisionPhase,
        progress: 0,
        message: 'Installation failed',
        details: {},
        error: 'Docker daemon not responding',
        timestamp: new Date(),
      }

      const result = ProvisionEventSchema.safeParse(eventWithError)
      expect(result.success).toBe(true)
    })

    it('should reject invalid event type', () => {
      const invalidEvent = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        type: 'invalid_type',
        phase: 'installing_services' as ProvisionPhase,
        progress: 70,
        message: 'Installing Coolify',
        details: {},
      }

      const result = ProvisionEventSchema.safeParse(invalidEvent)
      expect(result.success).toBe(false)
    })
  })

  describe('ProvisionResultSchema', () => {
    it('should validate successful result', () => {
      const successResult = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        success: true,
        phase: 'completed' as ProvisionPhase,
        serverIp: '192.168.1.100',
        dashboardUrl: 'https://coolify.example.com',
        credentials: {
          username: 'admin',
          password: 'secure123',
        },
        metadata: {
          serverId: 'droplet-123',
          region: 'nyc1',
        },
        duration: 300000, // 5 minutes
        completedAt: new Date(),
      }

      const result = ProvisionResultSchema.safeParse(successResult)
      expect(result.success).toBe(true)
    })

    it('should validate failed result', () => {
      const failedResult = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        success: false,
        phase: 'failed' as ProvisionPhase,
        error: 'Server creation failed',
        duration: 120000, // 2 minutes
        completedAt: new Date(),
      }

      const result = ProvisionResultSchema.safeParse(failedResult)
      expect(result.success).toBe(true)
    })

    it('should reject invalid IP address', () => {
      const invalidResult = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        success: true,
        phase: 'completed' as ProvisionPhase,
        serverIp: 'not-an-ip',
        completedAt: new Date(),
      }

      const result = ProvisionResultSchema.safeParse(invalidResult)
      expect(result.success).toBe(false)
    })

    it('should reject invalid URL', () => {
      const invalidResult = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        success: true,
        phase: 'completed' as ProvisionPhase,
        dashboardUrl: 'not-a-url',
        completedAt: new Date(),
      }

      const result = ProvisionResultSchema.safeParse(invalidResult)
      expect(result.success).toBe(false)
    })

    it('should reject negative duration', () => {
      const invalidResult = {
        id: crypto.randomUUID(),
        requestId: crypto.randomUUID(),
        success: true,
        phase: 'completed' as ProvisionPhase,
        duration: -1000,
        completedAt: new Date(),
      }

      const result = ProvisionResultSchema.safeParse(invalidResult)
      expect(result.success).toBe(false)
    })
  })
})
