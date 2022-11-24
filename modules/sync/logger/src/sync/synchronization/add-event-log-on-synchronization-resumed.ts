import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { CreateEventLogCommand } from '@koiner/logger/application';
import { SynchronizationResumed } from '@koiner/sync/domain';

export class AddEventLogOnSynchronizationResumed extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(SynchronizationResumed);
  }

  async handle(event: SynchronizationResumed): Promise<void> {
    await this.commandBus.execute(
      new CreateEventLogCommand({
        eventName: SynchronizationResumed.eventName,
        data: event,
        itemId: event.aggregateId,
        itemType: 'synchronization',
      })
    );
  }
}
