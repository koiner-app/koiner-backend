import { DomainEventHandler } from '@appvise/domain';
import { SynchronizationBatchStarted } from '@koiner/sync/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';

/**
 * Emit started event using EventEmitter because listening to DomainEvents will cause the updates
 * to synchronization inside the listener be overridden by the updates to the source synchronization.
 */
export class EmitSynchronizationBatchStarted extends DomainEventHandler {
  constructor(private readonly eventEmitter: EventEmitter2) {
    super(SynchronizationBatchStarted);
  }

  async handle(event: SynchronizationBatchStarted): Promise<void> {
    this.eventEmitter.emit(
      SynchronizationBatchStarted.eventName,
      new SynchronizationBatchStarted({
        aggregateId: event.aggregateId,
        headTopologyHeight: event.headTopologyHeight,
        lastIrreversibleBlock: event.lastIrreversibleBlock,
        lastSyncedBlock: event.lastSyncedBlock,
        startHeight: event.startHeight,
        endHeight: event.endHeight,
        batchSize: event.endHeight - event.startHeight + 1,
      })
    );
  }
}
