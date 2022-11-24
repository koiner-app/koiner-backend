import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { CreateEventLogCommand } from '@koiner/logger/application';
import { SynchronizationBatchFailed } from '@koiner/sync/domain';

export class AddEventLogOnSynchronizationBatchFailed extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(SynchronizationBatchFailed);
  }

  async handle(event: SynchronizationBatchFailed): Promise<void> {
    await this.commandBus.execute(
      new CreateEventLogCommand({
        eventName: SynchronizationBatchFailed.eventName,
        data: event,
        itemId: event.aggregateId,
        itemType: 'synchronization',
      })
    );
  }
}
