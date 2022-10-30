import { DomainEventHandler, Logger } from '@appvise/domain';
import { SynchronizationBatchFailed } from '@koiner/sync/domain';

export class ConsoleLogOnBatchFailed extends DomainEventHandler {
  constructor(private readonly logger: Logger) {
    super(SynchronizationBatchFailed);
  }

  async handle(event: SynchronizationBatchFailed): Promise<void> {
    this.logger.error(
      `Failed syncing batch of ${event.batchSize} blocks, started at ${
        event.startHeight
      }, failed at ${event.lastSyncedBlock + 1}`,
      event.error
    );
  }
}
