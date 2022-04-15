import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBlockCommand } from '@koiner/chain/application/block/command';
import { SyncBlockCommand } from './dto/sync-block.command';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';
import { Logger } from '@appvise/domain';
import { RawBlocksService } from '@koiner/sync/raw-blocks.service';

@CommandHandler(SyncBlockCommand)
export class SyncBlockHandler implements ICommandHandler<SyncBlockCommand> {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly rawBlocksService: RawBlocksService,
    private readonly contractStandardService: ContractStandardService,
    private readonly logger: Logger,
  ) {}

  async execute(command: SyncBlockCommand): Promise<void> {
    try {
      const rawBlock = await this.rawBlocksService.getBlock(
        command.blockHeight,
      );

      const signer = <string>rawBlock.block.header.signer;

      this.logger.debug(`Height: ${command.blockHeight}`, 'SyncBlockHandler');

      // Add address for signer
      await this.commandBus.execute(new CreateOrUpdateAddressCommand(signer));

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
        }),
      );

      this.logger.debug(
        `END BLOCK PROCESSING Height: ${command.blockHeight}`,
        'SyncBlockHandler',
      );
    } catch (error) {
      this.logger.error(error.message, error.stack, 'Sync-blocks error');
    }
  }
}
