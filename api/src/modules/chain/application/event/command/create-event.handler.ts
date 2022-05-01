import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { CreateEventCommand } from './dto/create-event.command';
import { Event, EventWriteRepository } from '@koiner/chain/domain';
import { KoinosAddressId, KoinosId } from '@koiner/domain';
import { ContractStandardType } from '@koiner/contracts/domain';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  constructor(private readonly writeRepository: EventWriteRepository) {}

  async execute(command: CreateEventCommand): Promise<void> {
    const event = Event.create(
      {
        transactionId: new KoinosId(command.transactionId),
        sequence: command.sequence,
        contractId: new KoinosAddressId(command.contractId),
        contractStandardType: command.contractStandard as ContractStandardType,
        name: command.name,
        data: command.data,
        impacted: command.impacted.map(
          (impacted) => new KoinosAddressId(impacted),
        ),
      },
      UUID.generate(),
    );

    await this.writeRepository.save(event, true);
  }
}
