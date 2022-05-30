import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RawBlocksService } from '@koiner/jsonrpc';
import { SyncBlockSetsCommand } from './dto/sync-block-sets.command';
import { SyncBlockCommand } from './dto/sync-block.command';

@CommandHandler(SyncBlockSetsCommand)
export class SyncBlockSetsHandler
  implements ICommandHandler<SyncBlockSetsCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly blocksService: RawBlocksService
  ) {}

  async execute(command: SyncBlockSetsCommand): Promise<void> {
    try {
      for (let i = 0; i < command.sets.length; i++) {
        const set = command.sets[i];
        let blocks = [];

        if (set.startHeight && set.amount) {
          blocks = await this.blocksService.getBlocks(
            set.startHeight,
            set.amount
          );
        } else if (set.blockIds) {
          blocks = await this.blocksService.getBlocksByIds(set.blockIds);
        }

        if (blocks) {
          for (const block of blocks) {
            await this.commandBus.execute(
              new SyncBlockCommand({
                blockHeight: parseInt(block.block_height),
              })
            );
          }
        }
      }
    } catch (error) {
      console.log('Sync-blocks error', error);
    }
  }
}
