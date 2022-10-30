import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { CreateEventLogCommand } from '@koiner/logger/application';
import { SynchronizationBatchCompleted } from '@koiner/sync/domain';

export class AddEventLogOnSynchronizationBatchCompleted extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(SynchronizationBatchCompleted);
  }

  async handle(event: SynchronizationBatchCompleted): Promise<void> {
    await this.commandBus.execute(
      new CreateEventLogCommand({
        eventName: SynchronizationBatchCompleted.eventName,
        data: event.toString(),
        itemId: event.aggregateId,
        itemType: 'synchronization',
      })
    );
  }
}
