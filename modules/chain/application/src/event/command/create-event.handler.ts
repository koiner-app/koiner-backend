import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import {
  Event,
  EventParentType,
  EventWriteRepository,
} from '@koiner/chain/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { CreateEventCommand } from './dto/create-event.command';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(private readonly writeRepository: EventWriteRepository) {}

  async execute(command: CreateEventCommand): Promise<void> {
    const event = Event.create(
      {
        parentId: new KoinosId(command.parentId),
        parentType: command.parentType as EventParentType,
        sequence: command.sequence,
        contractId: command.contractId
          ? new KoinosAddressId(command.contractId)
          : undefined,
        name: command.name,
        data: command.data,
        impacted: command.impacted
          ? command.impacted.map((impacted) => new KoinosAddressId(impacted))
          : undefined,
        timestamp: command.timestamp,
      },
      UUID.generate()
    );

    await this.writeRepository.save(event, true);
  }
}
