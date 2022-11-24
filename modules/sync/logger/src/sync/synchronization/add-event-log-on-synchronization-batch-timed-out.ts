import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { CreateEventLogCommand } from '@koiner/logger/application';
import { SynchronizationTimedOut } from '@koiner/sync/domain';

export class AddEventLogOnSynchronizationBatchTimedOut extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(SynchronizationTimedOut);
  }

  async handle(event: SynchronizationTimedOut): Promise<void> {
    await this.commandBus.execute(
      new CreateEventLogCommand({
        eventName: SynchronizationTimedOut.eventName,
        data: event,
        itemId: event.aggregateId,
        itemType: 'synchronization',
      })
    );
  }
}
