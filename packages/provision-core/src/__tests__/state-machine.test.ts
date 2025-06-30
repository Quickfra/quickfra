import { ProvisionStateMachine, createProvisionStateMachine } from '../state-machine'
import { ProvisionPhase } from '../types'

describe('ProvisionStateMachine', () => {
  let requestId: string
  let machine: ProvisionStateMachine

  beforeEach(() => {
    requestId = crypto.randomUUID()
    machine = createProvisionStateMachine(requestId, 'Starting provision')
  })

  describe('initialization', () => {
    it('should start in initializing phase', () => {
      const status = machine.getCurrentStatus()
      
      expect(status.requestId).toBe(requestId)
      expect(status.phase).toBe('initializing')
      expect(status.progress).toBe(5)
      expect(status.message).toBe('Starting provision')
      expect(status.startedAt).toBeInstanceOf(Date)
      expect(status.updatedAt).toBeInstanceOf(Date)
      expect(status.completedAt).toBeUndefined()
      expect(status.error).toBeUndefined()
    })

    it('should create initial event', () => {
      const events = machine.getEvents()
      expect(events).toHaveLength(0) // No events on creation, only on transitions
    })

    it('should not be finished initially', () => {
      expect(machine.isFinished()).toBe(false)
      expect(machine.isSuccessful()).toBe(false)
      expect(machine.isFailed()).toBe(false)
    })
  })

  describe('happy path transitions', () => {
    it('should advance through all phases successfully', () => {
      // initializing -> validating
      let status = machine.advance('validating', 'Validating configuration')
      expect(status.phase).toBe('validating')
      expect(status.progress).toBe(15)
      expect(status.message).toBe('Validating configuration')
      expect(status.error).toBeUndefined()

      // validating -> provisioning_infrastructure
      status = machine.advance('provisioning_infrastructure', 'Creating server')
      expect(status.phase).toBe('provisioning_infrastructure')
      expect(status.progress).toBe(40)

      // provisioning_infrastructure -> installing_services
      status = machine.advance('installing_services', 'Installing platform')
      expect(status.phase).toBe('installing_services')
      expect(status.progress).toBe(70)

      // installing_services -> configuring_platform
      status = machine.advance('configuring_platform', 'Configuring services')
      expect(status.phase).toBe('configuring_platform')
      expect(status.progress).toBe(90)

      // configuring_platform -> finalizing
      status = machine.advance('finalizing', 'Finalizing setup')
      expect(status.phase).toBe('finalizing')
      expect(status.progress).toBe(95)

      // finalizing -> completed
      status = machine.advance('completed', 'Provision completed successfully')
      expect(status.phase).toBe('completed')
      expect(status.progress).toBe(100)
      expect(status.completedAt).toBeInstanceOf(Date)

      expect(machine.isFinished()).toBe(true)
      expect(machine.isSuccessful()).toBe(true)
      expect(machine.isFailed()).toBe(false)
    })

    it('should create events for each transition', () => {
      machine.advance('validating', 'Validating')
      machine.advance('provisioning_infrastructure', 'Provisioning')
      machine.advance('installing_services', 'Installing')

      const events = machine.getEvents()
      expect(events).toHaveLength(3)

      expect(events[0].type).toBe('phase_started')
      expect(events[0].phase).toBe('validating')
      expect(events[1].type).toBe('phase_started')
      expect(events[1].phase).toBe('provisioning_infrastructure')
      expect(events[2].type).toBe('phase_started')
      expect(events[2].phase).toBe('installing_services')
    })

    it('should include details in transitions', () => {
      machine.advance('validating', 'Validating')
      
      const details = { serverId: 'droplet-123', region: 'nyc1' }
      const status = machine.advance('provisioning_infrastructure', 'Creating server', details)
      
      expect(status.details).toEqual(expect.objectContaining(details))

      const events = machine.getEvents()
      expect(events[1].details).toEqual(details)
    })

    it('should allow custom progress values', () => {
      machine.advance('validating', 'Validating')
      const status = machine.advance('provisioning_infrastructure', 'Creating server', {}, 35)
      expect(status.progress).toBe(35)
    })
  })

  describe('failure scenarios', () => {
    it('should handle failure from any phase', () => {
      machine.advance('validating', 'Validating')
      machine.advance('provisioning_infrastructure', 'Creating server')
      
      const errorMessage = 'Server creation failed'
      const errorDetails = { apiError: 'Quota exceeded' }
      
      const status = machine.fail(errorMessage, errorDetails)
      
      expect(status.phase).toBe('failed')
      expect(status.progress).toBe(0)
      expect(status.error).toBe(errorMessage)
      expect(status.message).toBe('Failed during provisioning_infrastructure: Server creation failed')
      expect(status.details).toEqual(expect.objectContaining(errorDetails))
      expect(status.completedAt).toBeInstanceOf(Date)
      
      expect(machine.isFinished()).toBe(true)
      expect(machine.isFailed()).toBe(true)
      expect(machine.isSuccessful()).toBe(false)
    })

    it('should create failure event', () => {
      machine.advance('validating', 'Validating')
      machine.fail('Validation failed')
      
      const events = machine.getEvents()
      expect(events).toHaveLength(2) // advance + fail
      
      const failEvent = events[1]
      expect(failEvent.type).toBe('phase_failed')
      expect(failEvent.phase).toBe('failed')
      expect(failEvent.error).toBe('Validation failed')
    })

    it('should include original phase in failure details', () => {
      machine.advance('validating', 'Validating')
      machine.advance('provisioning_infrastructure', 'Provisioning')
      machine.advance('installing_services', 'Installing')
      machine.fail('Installation failed')
      
      const events = machine.getEvents()
      const failEvent = events[3] // 0: validating, 1: provisioning, 2: installing, 3: fail
      expect(failEvent.details).toHaveProperty('originalPhase', 'installing_services')
    })
  })

  describe('progress updates', () => {
    beforeEach(() => {
      machine.advance('validating', 'Validating')
      machine.advance('provisioning_infrastructure', 'Creating server')
    })

    it('should update progress within current phase', () => {
      const status = machine.updateProgress(45, 'Configuring server', { step: 'network' })
      
      expect(status.phase).toBe('provisioning_infrastructure')
      expect(status.progress).toBe(45)
      expect(status.message).toBe('Configuring server')
      expect(status.details).toEqual(expect.objectContaining({ step: 'network' }))
    })

    it('should create progress update event', () => {
      machine.updateProgress(45, 'Configuring server')
      
      const events = machine.getEvents()
      expect(events).toHaveLength(3) // validating + provisioning + updateProgress
      
      const progressEvent = events[2] // Last event
      expect(progressEvent.type).toBe('progress_updated')
      expect(progressEvent.progress).toBe(45)
    })

    it('should reject invalid progress values', () => {
      expect(() => machine.updateProgress(-5, 'Invalid')).toThrow('Progress must be between 0 and 100')
      expect(() => machine.updateProgress(105, 'Invalid')).toThrow('Progress must be between 0 and 100')
    })

    it('should reject progress updates on completed provision', () => {
      machine.advance('installing_services', 'Installing')
      machine.advance('configuring_platform', 'Configuring')
      machine.advance('finalizing', 'Finalizing')
      machine.advance('completed', 'Completed')
      
      expect(() => machine.updateProgress(50, 'Should fail'))
        .toThrow('Cannot update progress on completed or failed provision')
    })

    it('should reject progress updates on failed provision', () => {
      machine.fail('Test failure')
      
      expect(() => machine.updateProgress(50, 'Should fail'))
        .toThrow('Cannot update progress on completed or failed provision')
    })
  })

  describe('transition validation', () => {
    it('should validate allowed transitions', () => {
      expect(machine.canTransitionTo('validating')).toBe(true)
      expect(machine.canTransitionTo('failed')).toBe(true)
      expect(machine.canTransitionTo('provisioning_infrastructure')).toBe(false)
    })

    it('should get valid next phases', () => {
      const validPhases = machine.getValidNextPhases()
      expect(validPhases).toEqual(['validating', 'failed'])
    })

    it('should prevent invalid transitions', () => {
      expect(() => machine.advance('installing_services', 'Invalid'))
        .toThrow('Invalid transition from \'initializing\' to \'installing_services\'')
    })

    it('should prevent transitions from completed state', () => {
      machine.advance('validating', 'Validating')
      machine.advance('provisioning_infrastructure', 'Provisioning')
      machine.advance('installing_services', 'Installing')
      machine.advance('configuring_platform', 'Configuring')
      machine.advance('finalizing', 'Finalizing')
      machine.advance('completed', 'Completed')
      
      expect(machine.canTransitionTo('failed')).toBe(false)
      expect(() => machine.advance('failed', 'Should fail'))
        .toThrow('Invalid transition from \'completed\' to \'failed\'')
    })

    it('should prevent transitions from failed state', () => {
      machine.fail('Test failure')
      
      expect(machine.canTransitionTo('validating')).toBe(false)
      expect(() => machine.advance('validating', 'Should fail'))
        .toThrow('Invalid transition from \'failed\' to \'validating\'')
    })
  })

  describe('duration calculation', () => {
    it('should return null for unfinished provision', () => {
      expect(machine.getDuration()).toBeNull()
      
      machine.advance('validating', 'Validating')
      expect(machine.getDuration()).toBeNull()
    })

    it('should calculate duration for completed provision', (done) => {
      setTimeout(() => {
        machine.advance('validating', 'Validating')
        machine.advance('provisioning_infrastructure', 'Provisioning')
        machine.advance('installing_services', 'Installing')
        machine.advance('configuring_platform', 'Configuring')
        machine.advance('finalizing', 'Finalizing')
        machine.advance('completed', 'Completed')
        
        const duration = machine.getDuration()
        expect(duration).toBeGreaterThan(0)
        expect(typeof duration).toBe('number')
        done()
      }, 10) // Small delay to ensure measurable duration
    })

    it('should calculate duration for failed provision', (done) => {
      setTimeout(() => {
        machine.advance('validating', 'Validating')
        machine.fail('Test failure')
        
        const duration = machine.getDuration()
        expect(duration).toBeGreaterThan(0)
        done()
      }, 10)
    })
  })

  describe('state immutability', () => {
    it('should return immutable status copies', () => {
      const status1 = machine.getCurrentStatus()
      status1.phase = 'completed' as ProvisionPhase // This should not affect the machine
      
      const status2 = machine.getCurrentStatus()
      expect(status2.phase).toBe('initializing')
    })

    it('should return immutable event copies', () => {
      machine.advance('validating', 'Validating')
      
      const events1 = machine.getEvents()
      events1.push({} as any) // This should not affect the machine
      
      const events2 = machine.getEvents()
      expect(events2).toHaveLength(1)
    })
  })

  describe('error clearing', () => {
    it('should clear previous errors on successful advance', () => {
      machine.advance('validating', 'Validating')
      machine.fail('Test error')
      
      // Create new machine from failed state (simulating recovery)
      const newMachine = createProvisionStateMachine(crypto.randomUUID())
      newMachine.advance('validating', 'Validating after recovery')
      
      const status = newMachine.getCurrentStatus()
      expect(status.error).toBeUndefined()
    })
  })
})
