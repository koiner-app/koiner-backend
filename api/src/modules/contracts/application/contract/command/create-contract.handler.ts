import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Contract, ContractWriteRepository } from '@koiner/contracts/domain';
import { CreateContractCommand } from './dto/create-contract.command';
import { KoinosAddressId } from '@koiner/domain';

@CommandHandler(CreateContractCommand)
export class CreateContractHandler
  implements ICommandHandler<CreateContractCommand>
{
  constructor(private readonly writeRepository: ContractWriteRepository) {}

  async execute(command: CreateContractCommand): Promise<void> {
    const contract = Contract.create(
      {
        bytecode: command.bytecode,
        abi: command.abi,
        contractStandardType: command.contractStandardType,
      },
      new KoinosAddressId(command.id),
    );

    await this.writeRepository.save(contract);
  }
}
