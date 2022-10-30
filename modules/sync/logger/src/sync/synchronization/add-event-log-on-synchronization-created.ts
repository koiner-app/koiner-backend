import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { CreateEventLogCommand } from '@koiner/logger/application';
import { SynchronizationCreated } from '@koiner/sync/domain';

export class AddEventLogOnSynchronizationCreated extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(SynchronizationCreated);
  }

  async handle(event: SynchronizationCreated): Promise<void> {
    await this.commandBus.execute(
      new CreateEventLogCommand({
        eventName: SynchronizationCreated.eventName,
        data: event.toString(),
        itemId: event.aggregateId,
        itemType: 'synchronization',
      })
    );
  }
}
