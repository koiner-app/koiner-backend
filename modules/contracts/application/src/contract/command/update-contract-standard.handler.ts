import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ContractWriteRepository } from '@koiner/contracts/domain';
import { UpdateContractStandardCommand } from './dto/update-contract-standard.command';
import { ContractStandardType } from '@koiner/contracts/standards';

@CommandHandler(UpdateContractStandardCommand)
export class UpdateContractHandler
  implements ICommandHandler<UpdateContractStandardCommand>
{
  constructor(private readonly writeRepository: ContractWriteRepository) {}

  async execute(command: UpdateContractStandardCommand): Promise<void> {
    const contract = await this.writeRepository.findOneById(command.id);

    if (contract) {
      contract.updateContractStandardType(ContractStandardType.token);

      await this.writeRepository.save(contract);
    }
  }
}
