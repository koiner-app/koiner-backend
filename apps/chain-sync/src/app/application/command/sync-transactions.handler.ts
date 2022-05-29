import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@appvise/domain';
import { RawBlocksService } from '@koiner/jsonrpc';
import {
  CreateOrUpdateAddressCommand,
  CreateTransactionCommand,
} from '@koiner/chain/application';
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
      const payer = transactionJson.header.payer;
      const transactionId = transactionJson.id;

      // Create Address (if not already created)
      await this.commandBus.execute(
        new CreateOrUpdateAddressCommand({
          id: payer,
        })
      );

      // Create Transaction
      await this.commandBus.execute(
        new CreateTransactionCommand({
          id: transactionId,
          blockHeight: command.blockHeight,
          rcLimit: <string>transactionJson.header.rc_limit,
          payer,
          signature: transactionJson.signatures,
          transactionIndex,
          operationCount: Array.isArray(transactionJson.operations)
            ? transactionJson.operations.length
            : 0,
          nonce: <string>transactionJson.header.nonce,
          operationMerkleRoot: transactionJson.header.operation_merkle_root,
        })
      );
    }
  }
}
