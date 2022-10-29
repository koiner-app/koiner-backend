import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import {
  ContractEvent,
  ContractEventWriteRepository,
} from '@koiner/contracts/domain';
import { EventParentType, KoinosAddressId, KoinosId } from '@koiner/domain';
import { CreateContractEventCommand } from './dto/create-contract-event.command';

@CommandHandler(CreateContractEventCommand)
export class CreateContractEventHandler
  implements ICommandHandler<CreateContractEventCommand>
{
  constructor(private readonly writeRepository: ContractEventWriteRepository) {}

  async execute(command: CreateContractEventCommand): Promise<void> {
    const event = ContractEvent.create(
      {
        blockHeight: command.blockHeight,
        parentId: new KoinosId(command.parentId),
        parentType: command.parentType as EventParentType,
        sequence: command.sequence,
        contractId: new KoinosAddressId(command.contractId),
        contractStandardType: command.contractStandardType,
        name: command.name,
        data: command.data,
        impacted: command.impacted
          ? command.impacted.map((impacted) => new KoinosAddressId(impacted))
          : undefined,
        timestamp: command.timestamp,
      },
      new UUID(command.id)
    );

    await this.writeRepository.save(event, true);
  }
}
