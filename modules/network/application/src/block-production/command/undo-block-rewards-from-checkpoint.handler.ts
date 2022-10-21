import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { SearchResponse, SortDirection } from '@appvise/domain';
import { BlockReward } from '@koiner/network/domain';
import { BlockRewardsQuery } from '../..';
import { UndoBlockRewardsCommand } from './dto/undo-block-rewards.command';
import { UndoBlockRewardsFromCheckpointCommand } from './dto/undo-block-rewards-from-checkpoint.command';

@CommandHandler(UndoBlockRewardsFromCheckpointCommand)
export class UndoBlockRewardsFromCheckpointHandler
  implements ICommandHandler<UndoBlockRewardsFromCheckpointCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async execute(command: UndoBlockRewardsFromCheckpointCommand): Promise<void> {
    const highestBlock = await this.queryBus.execute<
      BlockRewardsQuery,
      SearchResponse<BlockReward>
    >(
      new BlockRewardsQuery({
        first: 1,
        sort: [
          {
            field: 'blockHeight',
            direction: SortDirection.desc,
          },
        ],
      })
    );

    const lastSyncedBlockHeight = highestBlock.results[0].item.blockHeight;

    const blockHeights: number[] = [];

    let start = command.checkPoint;
    start++;

    // Get all heights from checkpoint up until last synced block
    for (let i = start; i <= lastSyncedBlockHeight; i++) {
      blockHeights.push(i);
    }

    // Remove operations
    await this.commandBus.execute(
      new UndoBlockRewardsCommand({
        blockHeights,
      })
    );
  }
}
