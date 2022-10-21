import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Block } from '@koiner/chain/domain';
import { BlocksQuery } from '../..';
import { UndoBlocksCommand } from './dto/undo-blocks.command';
import { SearchResponse, SortDirection } from '@appvise/domain';
import { UndoBlocksFromCheckpointCommand } from './dto/undo-blocks-from-checkpoint.command';

@CommandHandler(UndoBlocksFromCheckpointCommand)
export class UndoBlocksFromCheckpointHandler
  implements ICommandHandler<UndoBlocksFromCheckpointCommand>
{
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  async execute(command: UndoBlocksFromCheckpointCommand): Promise<void> {
    const highestBlock = await this.queryBus.execute<
      BlocksQuery,
      SearchResponse<Block>
    >(
      new BlocksQuery({
        first: 1,
        sort: [
          {
            field: 'height',
            direction: SortDirection.desc,
          },
        ],
      })
    );

    const lastSyncedBlockHeight = parseInt(
      String(highestBlock.results[0].item.header.height)
    );

    const blockHeights: number[] = [];
    if (command.checkPoint === lastSyncedBlockHeight) {
      // Nothing to undo
      return;
    }

    let start = command.checkPoint;
    start++;

    // Get all heights from next block after checkpoint up until last synced block
    for (let i = start; i <= lastSyncedBlockHeight; i++) {
      blockHeights.push(i);
    }

    // Remove operations
    await this.commandBus.execute(
      new UndoBlocksCommand({
        blockHeights,
      })
    );
  }
}
