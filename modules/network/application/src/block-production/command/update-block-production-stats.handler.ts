import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UUID } from '@appvise/domain';
import { KoinosAddressId } from '@koiner/domain';
import {
  BlockProductionStats,
  BlockProductionStatsReadRepository,
  BlockProductionStatsWriteRepository,
} from '@koiner/network/domain';
import { UpdateBlockProductionStatsCommand } from './dto/update-block-production-stats.command';

@CommandHandler(UpdateBlockProductionStatsCommand)
export class UpdateBlockProductionStatsHandler
  implements ICommandHandler<UpdateBlockProductionStatsCommand>
{
  constructor(
    private readonly readRepository: BlockProductionStatsReadRepository,
    private readonly writeRepository: BlockProductionStatsWriteRepository
  ) {}

  async execute(command: UpdateBlockProductionStatsCommand): Promise<void> {
    let blockProductionStats = await this.readRepository.findOneByContractId(
      command.contractId
    );

    if (blockProductionStats) {
      blockProductionStats.addRewards(
        command.amountRewarded,
        command.burnedValue
      );

      await this.writeRepository.save(blockProductionStats);
    } else {
      blockProductionStats = BlockProductionStats.create(
        {
          contractId: new KoinosAddressId(command.contractId),
          rewarded: command.amountRewarded,
          burned: command.burnedValue,
        },
        UUID.generate()
      );

      await this.writeRepository.save(blockProductionStats);
    }
  }
}
