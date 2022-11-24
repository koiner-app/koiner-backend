import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { CreateEventLogCommand } from '@koiner/logger/application';
import { SynchronizationBatchStarted } from '@koiner/sync/domain';

export class AddEventLogOnSynchronizationBatchStarted extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(SynchronizationBatchStarted);
  }

  async handle(event: SynchronizationBatchStarted): Promise<void> {
    await this.commandBus.execute(
      new CreateEventLogCommand({
        eventName: SynchronizationBatchStarted.eventName,
        data: event,
        itemId: event.aggregateId,
        itemType: 'synchronization',
      })
    );
  }
}
