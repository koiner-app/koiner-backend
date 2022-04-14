import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Krc20ContractWriteRepository } from '@koiner/contracts/domain';
import { UpdateKrc20ContractStatsCommand } from './dto/update-krc20-stats.command';

@CommandHandler(UpdateKrc20ContractStatsCommand)
export class UpdateKrc20ContractStatsHandler
  implements ICommandHandler<UpdateKrc20ContractStatsCommand>
{
  constructor(private readonly writeRepository: Krc20ContractWriteRepository) {}

  async execute(command: UpdateKrc20ContractStatsCommand): Promise<void> {
    const krc20Contract = await this.writeRepository.findOneByIdOrThrow(
      command.contractId,
    );

    krc20Contract.updateStats(command.stats);

    await this.writeRepository.save(krc20Contract);
  }
}
