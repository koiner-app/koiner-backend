import { DomainEventHandler, Logger } from '@appvise/domain';
import { SynchronizationBatchCompleted } from '@koiner/sync/domain';

export class ConsoleLogOnBatchCompleted extends DomainEventHandler {
  constructor(private readonly logger: Logger) {
    super(SynchronizationBatchCompleted);
  }

  async handle(event: SynchronizationBatchCompleted): Promise<void> {
    this.logger.log(
      `Done syncing batch of ${event.batchSize} blocks, from ${event.startHeight} to ${event.endHeight}`
    );
  }
}
