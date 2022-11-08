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
        command.mintedValue,
        command.burnedValue,
        command.isNewProducer
      );

      await this.writeRepository.save(blockProductionStats);
    } else {
      blockProductionStats = BlockProductionStats.create(
        {
          contractId: new KoinosAddressId(command.contractId),
          mintedTotal: command.mintedValue,
          burnedTotal: command.burnedValue,
        },
        UUID.generate()
      );

      await this.writeRepository.save(blockProductionStats);
    }
  }
}
