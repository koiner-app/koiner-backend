import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Provider, Serializer, utils } from 'koilib';
import { CreateBlockCommand } from '@koiner/chain/application/block/command';
import { SyncBlocksCommand } from './dto/sync-blocks.command';
import { SyncTransactionsCommand } from './dto/sync-transactions.command';
import { Inject } from '@nestjs/common';

@CommandHandler(SyncBlocksCommand)
export class SyncBlocksHandler implements ICommandHandler<SyncBlocksCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
    @Inject('ActiveBlockDataSerializer')
    private readonly activeBlockDataSerializer: Serializer,
  ) {}

  async execute(command: SyncBlocksCommand): Promise<void> {
    const blocks = await this.provider.getBlocks(
      command.startHeight,
      command.amount,
    );

    if (blocks) {
      for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
        const block = blocks[blockIdx];
        const active = await this.activeBlockDataSerializer.deserialize(
          block.block.active,
        );
        const block_signer = utils.encodeBase58(
          utils.decodeBase64(<string>active.signer),
        );

        await this.commandBus.execute(
          new CreateBlockCommand(
            block.block_id,
            block.block.header.previous,
            parseInt(block.block_height),
            parseInt(block.block.header.timestamp),
            <string>active.previous_state_merkle_root,
            <string>active.transaction_merkle_root,
            block_signer,
            block.block.signature_data,
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
  }
}
