import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { CreateEventLogCommand } from '@koiner/logger/application';
import { SynchronizationStopped } from '@koiner/sync/domain';

export class AddEventLogOnSynchronizationStopped extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(SynchronizationStopped);
  }

  async handle(event: SynchronizationStopped): Promise<void> {
    await this.commandBus.execute(
      new CreateEventLogCommand({
        eventName: SynchronizationStopped.eventName,
        data: event.toString(),
        itemId: event.aggregateId,
        itemType: 'synchronization',
      })
    );
  }
}
