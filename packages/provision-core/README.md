# @quickfra/provision-core

Core provisioning library with state machine and DTOs for infrastructure deployment lifecycle management.

## Features

- **Strict TypeScript** - Full type safety with no runtime dependencies except Zod
- **State Machine** - Robust phase transitions with validation
- **Zod DTOs** - Validated data transfer objects for all operations
- **Event Tracking** - Complete audit trail of provisioning events
- **Test Coverage** - 100% coverage with Jest

## Usage

```typescript
import { createProvisionStateMachine, ProvisionRequestSchema } from '@quickfra/provision-core'

// Create state machine
const machine = createProvisionStateMachine('request-uuid', 'Starting deployment')

// Advance through phases
machine.advance('validating', 'Validating configuration')
machine.advance('provisioning_infrastructure', 'Creating server')
machine.updateProgress(45, 'Installing Docker')
machine.advance('installing_services', 'Installing Coolify')
machine.advance('configuring_platform', 'Setting up SSL')
machine.advance('finalizing', 'Final configuration')
machine.advance('completed', 'Deployment successful')

// Get current status
const status = machine.getCurrentStatus()
console.log(status.phase, status.progress) // 'completed', 100

// Get all events
const events = machine.getEvents()
console.log(events.length) // All phase transitions and updates
```

## Phase Flow

```
initializing → validating → provisioning_infrastructure → installing_services → configuring_platform → finalizing → completed
     ↓              ↓                        ↓                         ↓                      ↓               ↓
   failed         failed                   failed                   failed                failed          failed
```

## API

### State Machine

- `advance(phase, message, details?, customProgress?)` - Move to next phase
- `fail(error, details?)` - Mark as failed
- `updateProgress(progress, message, details?)` - Update progress within phase
- `getCurrentStatus()` - Get current state
- `getEvents()` - Get all events
- `isFinished()` - Check if done
- `isSuccessful()` - Check if completed successfully

### DTOs

All DTOs are validated with Zod schemas:

- `ProvisionRequest` - Initial deployment request
- `ProvisionStatus` - Current deployment state
- `ProvisionEvent` - State change event
- `ProvisionResult` - Final deployment result

## Testing

```bash
pnpm test
pnpm test:coverage
```

## License

Private - @quickfra internal use only
