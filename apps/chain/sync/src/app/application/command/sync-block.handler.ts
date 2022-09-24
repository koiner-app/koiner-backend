import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { RawBlocksService } from '@koinos/jsonrpc';
import { CreateBlockCommand, BlockQuery } from '@koiner/chain/application';
import { SyncBlockCommand } from './dto/sync-block.command';
import { Chain } from '@koiner/chain/domain';

@CommandHandler(SyncBlockCommand)
export class SyncBlockHandler implements ICommandHandler<SyncBlockCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly rawBlocksService: RawBlocksService,
    private readonly logger: Logger
  ) {}

  async execute(command: SyncBlockCommand): Promise<void> {
    try {
      if (process.env.INIT_SYNC === 'active') {
        // Check if block has already been processed
        // We only need to prevent double submitting of blocks
        // when initial sync is still active.
        let block;

        try {
          block = await this.queryBus.execute<BlockQuery, Chain>(
            new BlockQuery(command.blockHeight)
          );
        } catch {
          // Block not found. Continue
        }

        if (block) {
          this.logger.warn(`Block ${command.blockHeight} already processed`);

          return;
        }
      }

      const rawBlock = await this.rawBlocksService.getBlock(
        command.blockHeight
      );

      const signer = <string>rawBlock.block.header.signer;

      this.logger.debug(`Height: ${command.blockHeight}`, 'SyncBlockHandler');

      await this.commandBus.execute(
        new CreateBlockCommand({
          id: rawBlock.block_id,
          header: {
            previous: rawBlock.block.header.previous,
            height: command.blockHeight,
            timestamp: parseInt(rawBlock.block.header.timestamp),
            previousStateMerkleRoot: <string>(
              rawBlock.block.header.previous_state_merkle_root
            ),
            transactionMerkleRoot: <string>(
              rawBlock.block.header.transaction_merkle_root
            ),
            signer,
          },
          signature: <string>rawBlock.block.signature,
          transactionCount: rawBlock.block.transactions
            ? rawBlock.block.transactions.length
            : 0,
          receipt: {
            diskStorageUsed: rawBlock.receipt.disk_storage_used
              ? parseInt(rawBlock.receipt.disk_storage_used.toString())
              : 0,
            networkBandwidthUsed: rawBlock.receipt.network_bandwidth_used
              ? parseInt(rawBlock.receipt.network_bandwidth_used.toString())
              : 0,
            computeBandwidthUsed: rawBlock.receipt.compute_bandwidth_used
              ? parseInt(rawBlock.receipt.compute_bandwidth_used.toString())
              : 0,
            eventCount: rawBlock.receipt.events
              ? rawBlock.receipt.events.length
              : 0,
          },
        })
      );

      this.logger.debug(
        `END BLOCK PROCESSING Height: ${command.blockHeight}`,
        'SyncBlockHandler'
      );
    } catch (error) {
      this.logger.error(error.message, error.stack, 'Sync-blocks error');
    }
  }
}
