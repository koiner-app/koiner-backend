import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  BlockReadRepository,
  BlockWriteRepository,
} from '@koiner/chain/domain';
import {
  UndoEventsByBlockHeightCommand,
  UndoOperationsByBlockHeightCommand,
  UndoTransactionsByBlockHeightCommand,
} from '../..';
import { UndoBlocksCommand } from './dto/undo-blocks.command';

@CommandHandler(UndoBlocksCommand)
export class UndoBlocksHandler implements ICommandHandler<UndoBlocksCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly blockReadRepository: BlockReadRepository,
    private readonly blockWriteRepository: BlockWriteRepository
  ) {}

  async execute(command: UndoBlocksCommand): Promise<void> {
    if (command.blockHeights.length === 0) {
      return;
    }

    // Remove events
    await this.commandBus.execute(
      new UndoEventsByBlockHeightCommand({
        blockHeights: command.blockHeights,
      })
    );

    // Remove operations
    await this.commandBus.execute(
      new UndoOperationsByBlockHeightCommand({
        blockHeights: command.blockHeights,
      })
    );

    // Remove transactions
    await this.commandBus.execute(
      new UndoTransactionsByBlockHeightCommand({
        blockHeights: command.blockHeights,
      })
    );

    const blocks = await this.blockReadRepository.find({
      first: 1000,
      filter: {
        OR: command.blockHeights.map((blockHeight) => {
          return {
            height: { equals: blockHeight },
          };
        }),
      },
    });

    for (const block of blocks.results) {
      await this.blockWriteRepository.delete(block.item);
    }
  }
}
