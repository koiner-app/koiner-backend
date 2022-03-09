import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Provider } from 'koilib';
import { CreateBlockCommand } from '@koiner/chain/application/block/command';
import { SyncBlocksCommand } from './dto/sync-blocks.command';
import { SyncTransactionsCommand } from './dto/sync-transactions.command';

@CommandHandler(SyncBlocksCommand)
export class SyncBlocksHandler implements ICommandHandler<SyncBlocksCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
  ) {}

  async execute(command: SyncBlocksCommand): Promise<void> {
    try {
      const blocks = await this.provider.getBlocks(
        command.startHeight,
        command.amount,
      );

      if (blocks) {
        for (const block of blocks) {
          const block_signer = <string>block.block.header.signer;

          await this.commandBus.execute(
            new CreateBlockCommand(
              block.block_id,
              block.block.header.previous,
              parseInt(block.block_height),
              parseInt(block.block.header.timestamp),
              <string>block.block.header.previous_state_merkle_root,
              <string>block.block.header.transaction_merkle_root,
              block_signer,
              <string>block.block.signature,
              block.block.transactions ? block.block.transactions.length : 0,
            ),
          );

          if (block.block.transactions) {
            await this.commandBus.execute(
              new SyncTransactionsCommand(block.block_height, block.block),
            );
          }
        }
      }
    } catch (error) {
      console.log('Sync-blocks error', error);
    }
  }
}
