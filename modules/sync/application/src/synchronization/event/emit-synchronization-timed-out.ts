import { DomainEventHandler } from '@appvise/domain';
import { SynchronizationTimedOut } from '@koiner/sync/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';

/**
 * Emit timed out event using EventEmitter because listening to DomainEvents will cause the updates
 * to synchronization inside the listener be overridden by the updates to the source synchronization.
 */
export class EmitSynchronizationTimedOut extends DomainEventHandler {
  constructor(private readonly eventEmitter: EventEmitter2) {
    super(SynchronizationTimedOut);
  }

  async handle(event: SynchronizationTimedOut): Promise<void> {
    this.eventEmitter.emit(
      SynchronizationTimedOut.eventName,
      new SynchronizationTimedOut({
        aggregateId: event.aggregateId,
        headTopologyHeight: event.headTopologyHeight,
        lastIrreversibleBlock: event.lastIrreversibleBlock,
        lastSyncedBlock: event.lastSyncedBlock,
        timedOutAt: event.timedOutAt,
      })
    );
  }
}
