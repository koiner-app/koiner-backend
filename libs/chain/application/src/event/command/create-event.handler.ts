import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { Event, EventWriteRepository } from '@koiner/chain/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { CreateEventCommand } from './dto/create-event.command';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(private readonly writeRepository: EventWriteRepository) {}

  async execute(command: CreateEventCommand): Promise<void> {
    const event = Event.create(
      {
        transactionId: new KoinosId(command.transactionId),
        // -1 fallback for missing sequence (should always be there?)
        sequence: command.sequence ?? -1,
        contractId: command.contractId
          ? new KoinosAddressId(command.contractId)
          : undefined,
        name: command.name,
        data: command.data,
        impacted: command.impacted
          ? command.impacted.map((impacted) => new KoinosAddressId(impacted))
          : undefined,
      },
      UUID.generate()
    );

    await this.writeRepository.save(event, true);
  }
}
