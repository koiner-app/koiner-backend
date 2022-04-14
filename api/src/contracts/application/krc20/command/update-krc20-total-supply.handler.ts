import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Krc20ContractWriteRepository } from '@koiner/contracts/domain';
import { UpdateKrc20TotalSupplyCommand } from './dto/update-krc20-total-supply.command';

@CommandHandler(UpdateKrc20TotalSupplyCommand)
export class UpdateKrc20TotalSupplyHandler
  implements ICommandHandler<UpdateKrc20TotalSupplyCommand>
{
  constructor(private readonly writeRepository: Krc20ContractWriteRepository) {}

  async execute(command: UpdateKrc20TotalSupplyCommand): Promise<void> {
    const krc20Contract = await this.writeRepository.findOneByIdOrThrow(
      command.contractId,
    );

    krc20Contract.updateTotalSupply(command.mintedTokens);

    await this.writeRepository.save(krc20Contract);
  }
}
