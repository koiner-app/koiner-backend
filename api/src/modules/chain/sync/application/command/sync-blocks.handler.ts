import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RawBlocksService } from '@koinos/raw-blocks.service';
import { SyncBlocksCommand } from './dto/sync-blocks.command';
import { SyncBlockCommand } from './dto/sync-block.command';

@CommandHandler(SyncBlocksCommand)
export class SyncBlocksHandler implements ICommandHandler<SyncBlocksCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly blocksService: RawBlocksService,
  ) {}

  async execute(command: SyncBlocksCommand): Promise<void> {
    try {
      const blocks = await this.blocksService.getBlocks(
        command.startHeight,
        command.amount,
      );

      if (blocks) {
        for (const block of blocks) {
          await this.commandBus.execute(
            new SyncBlockCommand({
              blockHeight: parseInt(block.block_height),
            }),
          );
        }
      }
    } catch (error) {
      console.log('Sync-blocks error', error);
    }
  }
}
