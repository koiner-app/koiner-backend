import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/jsonrpc';
import { SyncBlockRewardsCommand } from './dto/sync-block-rewards.command';
import { SyncBlockRewardCommand } from './dto/sync-block-reward.command';

@CommandHandler(SyncBlockRewardsCommand)
export class SyncBlockRewardsHandler
  implements ICommandHandler<SyncBlockRewardsCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly blocksService: RawBlocksService
  ) {}

  async execute(command: SyncBlockRewardsCommand): Promise<void> {
    const blocks = await this.blocksService.getBlocks(
      command.startHeight,
      command.amount
    );

    if (blocks) {
      for (const block of blocks) {
        await this.commandBus.execute(
          new SyncBlockRewardCommand({
            blockHeight: parseInt(block.block_height),
          })
        );
      }
    }
  }
}
