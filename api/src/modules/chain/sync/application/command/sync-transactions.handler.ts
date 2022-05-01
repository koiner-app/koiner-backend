import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTransactionCommand } from '@koiner/chain/application/transaction/command';
import { SyncTransactionsCommand } from './dto/sync-transactions.command';
import { CreateOrUpdateAddressCommand } from '@koiner/chain/application/address/command';
import { Logger } from '@appvise/domain';
import { RawBlocksService } from '@koinos/raw-blocks.service';

@CommandHandler(SyncTransactionsCommand)
export class SyncTransactionsHandler
  implements ICommandHandler<SyncTransactionsCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
    private readonly rawBlocksService: RawBlocksService,
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
      await this.commandBus.execute(new CreateOrUpdateAddressCommand(payer));

      // Create Transaction
      await this.commandBus.execute(
        new CreateTransactionCommand(
          transactionId,
          command.blockHeight,
          <string>transactionJson.header.rc_limit,
          payer,
          transactionJson.signatures,
          transactionIndex,
          Array.isArray(transactionJson.operations)
            ? transactionJson.operations.length
            : 0,
          <string>transactionJson.header.nonce,
          transactionJson.header.operation_merkle_root,
        ),
      );
    }
  }
}
