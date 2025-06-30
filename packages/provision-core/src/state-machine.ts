import { ProvisionPhase, ProvisionStatus, ProvisionEvent, ProvisionEventSchema } from './types'

/**
 * Phase progress mapping for automatic progress calculation
 */
const PHASE_PROGRESS: Record<ProvisionPhase, number> = {
  initializing: 5,
  validating: 15,
  provisioning_infrastructure: 40,
  installing_services: 70,
  configuring_platform: 90,
  finalizing: 95,
  completed: 100,
  failed: 0,
}

/**
 * Valid phase transitions
 */
const PHASE_TRANSITIONS: Record<ProvisionPhase, ProvisionPhase[]> = {
  initializing: ['validating', 'failed'],
  validating: ['provisioning_infrastructure', 'failed'],
  provisioning_infrastructure: ['installing_services', 'failed'],
  installing_services: ['configuring_platform', 'failed'],
  configuring_platform: ['finalizing', 'failed'],
  finalizing: ['completed', 'failed'],
  completed: [],
  failed: [],
}

/**
 * State machine for provisioning lifecycle management
 */
export class ProvisionStateMachine {
  private status: ProvisionStatus
  private events: ProvisionEvent[] = []

  constructor(initialStatus: ProvisionStatus) {
    this.status = { ...initialStatus }
  }

  /**
   * Get current status
   */
  getCurrentStatus(): ProvisionStatus {
    return { ...this.status }
  }

  /**
   * Get all events
   */
  getEvents(): ProvisionEvent[] {
    return [...this.events]
  }

  /**
   * Advance to next phase with optional custom progress
   */
  advance(
    nextPhase: ProvisionPhase,
    message: string,
    details: Record<string, unknown> = {},
    customProgress?: number
  ): ProvisionStatus {
    this.validateTransition(nextPhase)

    const progress = customProgress ?? PHASE_PROGRESS[nextPhase]
    const now = new Date()

    // Update status
    this.status = {
      ...this.status,
      phase: nextPhase,
      progress,
      message,
      details: { ...this.status.details, ...details },
      updatedAt: now,
      completedAt: nextPhase === 'completed' || nextPhase === 'failed' ? now : undefined,
      error: undefined, // Clear previous errors on successful advance
    }

    // Create event
    const event = ProvisionEventSchema.parse({
      id: crypto.randomUUID(),
      requestId: this.status.requestId,
      type: nextPhase === 'completed' ? 'phase_completed' : 'phase_started',
      phase: nextPhase,
      progress,
      message,
      details,
      timestamp: now,
    })

    this.events.push(event)

    return this.getCurrentStatus()
  }

  /**
   * Mark current phase as failed
   */
  fail(error: string, details: Record<string, unknown> = {}): ProvisionStatus {
    const now = new Date()
    const originalPhase = this.status.phase

    // Update status
    this.status = {
      ...this.status,
      phase: 'failed',
      progress: 0,
      message: `Failed during ${originalPhase}: ${error}`,
      details: { ...this.status.details, ...details },
      error,
      updatedAt: now,
      completedAt: now,
    }

    // Create event
    const event = ProvisionEventSchema.parse({
      id: crypto.randomUUID(),
      requestId: this.status.requestId,
      type: 'phase_failed',
      phase: 'failed',
      progress: 0,
      message: this.status.message,
      details: { ...details, originalPhase },
      error,
      timestamp: now,
    })

    this.events.push(event)

    return this.getCurrentStatus()
  }

  /**
   * Update progress within current phase
   */
  updateProgress(
    progress: number,
    message: string,
    details: Record<string, unknown> = {}
  ): ProvisionStatus {
    if (progress < 0 || progress > 100) {
      throw new Error('Progress must be between 0 and 100')
    }

    if (this.status.phase === 'completed' || this.status.phase === 'failed') {
      throw new Error('Cannot update progress on completed or failed provision')
    }

    const now = new Date()

    // Update status
    this.status = {
      ...this.status,
      progress,
      message,
      details: { ...this.status.details, ...details },
      updatedAt: now,
    }

    // Create event
    const event = ProvisionEventSchema.parse({
      id: crypto.randomUUID(),
      requestId: this.status.requestId,
      type: 'progress_updated',
      phase: this.status.phase,
      progress,
      message,
      details,
      timestamp: now,
    })

    this.events.push(event)

    return this.getCurrentStatus()
  }

  /**
   * Check if current phase can transition to target phase
   */
  canTransitionTo(targetPhase: ProvisionPhase): boolean {
    if (this.status.phase === 'completed' || this.status.phase === 'failed') {
      return false
    }

    return PHASE_TRANSITIONS[this.status.phase].includes(targetPhase)
  }

  /**
   * Get next valid phases for current state
   */
  getValidNextPhases(): ProvisionPhase[] {
    return PHASE_TRANSITIONS[this.status.phase] || []
  }

  /**
   * Check if provision is in final state
   */
  isFinished(): boolean {
    return this.status.phase === 'completed' || this.status.phase === 'failed'
  }

  /**
   * Check if provision completed successfully
   */
  isSuccessful(): boolean {
    return this.status.phase === 'completed'
  }

  /**
   * Check if provision failed
   */
  isFailed(): boolean {
    return this.status.phase === 'failed'
  }

  /**
   * Get provision duration in milliseconds
   */
  getDuration(): number | null {
    if (!this.status.completedAt) {
      return null
    }

    return this.status.completedAt.getTime() - this.status.startedAt.getTime()
  }

  /**
   * Validate phase transition
   */
  private validateTransition(nextPhase: ProvisionPhase): void {
    if (!this.canTransitionTo(nextPhase)) {
      throw new Error(
        `Invalid transition from '${this.status.phase}' to '${nextPhase}'. ` +
        `Valid transitions: [${this.getValidNextPhases().join(', ')}]`
      )
    }
  }
}

/**
 * Factory function to create a new provision state machine
 */
export function createProvisionStateMachine(
  requestId: string,
  initialMessage: string = 'Provision started'
): ProvisionStateMachine {
  const now = new Date()
  
  const initialStatus: ProvisionStatus = {
    id: crypto.randomUUID(),
    requestId,
    phase: 'initializing',
    progress: PHASE_PROGRESS.initializing,
    message: initialMessage,
    details: {},
    startedAt: now,
    updatedAt: now,
  }

  return new ProvisionStateMachine(initialStatus)
}
