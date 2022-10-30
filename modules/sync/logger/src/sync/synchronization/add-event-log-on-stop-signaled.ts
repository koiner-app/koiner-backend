import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { CreateEventLogCommand } from '@koiner/logger/application';
import { StopSignaled } from '@koiner/sync/domain';

export class AddEventLogOnStopSignaled extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(StopSignaled);
  }

  async handle(event: StopSignaled): Promise<void> {
    await this.commandBus.execute(
      new CreateEventLogCommand({
        eventName: StopSignaled.eventName,
        data: event.toString(),
        itemId: event.aggregateId,
        itemType: 'stopSignal',
      })
    );
  }
}
