import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { RawBlocksService } from '@koinos/jsonrpc';
import { CreateTransactionCommand } from '@koiner/chain/application';
import { SyncTransactionsCommand } from './dto/sync-transactions.command';

@CommandHandler(SyncTransactionsCommand)
export class SyncTransactionsHandler
  implements ICommandHandler<SyncTransactionsCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
    private readonly rawBlocksService: RawBlocksService
  ) {}

  async execute(command: SyncTransactionsCommand): Promise<void> {
    const rawBlock = await this.rawBlocksService.getBlock(command.blockHeight);
    const transactions = rawBlock.block.transactions;

    for (
      let transactionIndex = 0;
      transactionIndex < transactions.length;
      transactionIndex++
    ) {
      const transactionJson: any = transactions[transactionIndex];
      const transactionId = transactionJson.id;
      const receipt = rawBlock.receipt.transaction_receipts[transactionIndex];

      // Create Transaction
      await this.commandBus.execute(
        new CreateTransactionCommand({
          id: transactionId,
          blockHeight: command.blockHeight,
          signatures: transactionJson.signatures,
          transactionIndex,
          operationCount: Array.isArray(transactionJson.operations)
            ? transactionJson.operations.length
            : 0,
          timestamp: parseInt(rawBlock.block.header.timestamp),
          header: {
            rcLimit: parseInt(<string>transactionJson.header.rc_limit),
            nonce: <string>transactionJson.header.nonce,
            operationMerkleRoot: transactionJson.header.operation_merkle_root,
            payer: transactionJson.header.payer,
            payee: transactionJson.header.payee,
          },
          receipt: {
            payer: receipt.payer,
            maxPayerRc: receipt.max_payer_rc
              ? parseInt(<string>receipt.max_payer_rc)
              : 0,
            rcLimit: receipt.rc_limit ? parseInt(<string>receipt.rc_limit) : 0,
            rcUsed: receipt.rc_used ? parseInt(<string>receipt.rc_used) : 0,
            reverted: receipt.reverted ?? false,
            diskStorageUsed: receipt.disk_storage_used
              ? parseInt(<string>receipt.disk_storage_used)
              : 0,
            networkBandwidthUsed: receipt.network_bandwidth_used
              ? parseInt(<string>receipt.network_bandwidth_used)
              : 0,
            computeBandwidthUsed: receipt.compute_bandwidth_used
              ? parseInt(<string>receipt.compute_bandwidth_used)
              : 0,
            eventCount: receipt.events ? receipt.events.length : 0,
          },
        })
      );
    }
  }
}
