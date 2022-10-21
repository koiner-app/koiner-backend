import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  BlockProducerWriteRepository,
  BlockRewardReadRepository,
  BlockRewardWriteRepository,
} from '@koiner/network/domain';
import { UndoBlockRewardsCommand } from './dto/undo-block-rewards.command';
import { koinosConfig } from '@koinos/jsonrpc';

@CommandHandler(UndoBlockRewardsCommand)
export class UndoBlockRewardsHandler
  implements ICommandHandler<UndoBlockRewardsCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly blockReadRepository: BlockRewardReadRepository,
    private readonly blockWriteRepository: BlockRewardWriteRepository,
    private readonly blockProducerWriteRepository: BlockProducerWriteRepository
  ) {}

  async execute(command: UndoBlockRewardsCommand): Promise<void> {
    const blockRewards = await this.blockReadRepository.find({
      first: 1000,
      filter: {
        OR: command.blockHeights.map((blockHeight) => {
          return {
            blockHeight: { equals: blockHeight },
          };
        }),
      },
    });

    for (const blockReward of blockRewards.results) {
      const producer = await this.blockProducerWriteRepository.findOne(
        blockReward.item.producerId.value,
        koinosConfig.contracts.koin
      );

      if (producer) {
        producer.undoRewards(
          blockReward.item.value,
          blockReward.item.burnedValue
        );

        this.blockProducerWriteRepository.save(producer);
      }

      await this.blockWriteRepository.delete(blockReward.item);
    }
  }
}
