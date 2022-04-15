import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Krc20ContractWriteRepository } from '@koiner/contracts/domain';
import { UpdateKrc20ContractCommand } from './dto/update-krc20-contract.command';

@CommandHandler(UpdateKrc20ContractCommand)
export class UpdateKrc20ContractHandler
  implements ICommandHandler<UpdateKrc20ContractCommand>
{
  constructor(private readonly writeRepository: Krc20ContractWriteRepository) {}

  async execute(command: UpdateKrc20ContractCommand): Promise<void> {
    const krc20Contract = await this.writeRepository.findOneByIdOrThrow(
      command.contractId,
    );

    krc20Contract.update({
      mintedTokens: command.mintedTokens,
      stats: command.stats,
    });

    await this.writeRepository.save(krc20Contract);
  }
}
