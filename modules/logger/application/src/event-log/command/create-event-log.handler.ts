import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { EventLog, EventLogWriteRepository } from '@koiner/logger/domain';
import { CreateEventLogCommand } from './dto/create-event-log.command';

@CommandHandler(CreateEventLogCommand)
export class CreateEventLogHandler
  implements ICommandHandler<CreateEventLogCommand>
{
  constructor(private readonly writeRepository: EventLogWriteRepository) {}

  async execute(command: CreateEventLogCommand): Promise<void> {
    const eventLog = EventLog.create(
      {
        eventName: command.eventName,
        data: command.data,
        itemId: command.itemId,
        itemType: command.itemType,
        timestamp: command.timestamp,
      },
      command.id ? new UUID(command.id) : undefined
    );

    await this.writeRepository.save(eventLog);
  }
}
