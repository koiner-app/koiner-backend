import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Serializer, Signer } from 'koilib';
import { CreateTransactionCommand } from '@koiner/chain/application/transaction/command';
import { SyncTransactionsCommand } from './dto/sync-transactions.command';
import { SyncOperationsCommand } from '@koiner/workers/application/chain/command/dto/sync-operations.command';
import { CreateAddressCommand } from '@koiner/chain/application/address/command';
import { Inject } from '@nestjs/common';

@CommandHandler(SyncTransactionsCommand)
export class SyncTransactionsHandler
  implements ICommandHandler<SyncTransactionsCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly signer: Signer,
    @Inject('ActiveTransactionDataSerializer')
    private readonly activeTransactionDataSerializer: Serializer,
    @Inject('PassiveTransactionDataSerializer')
    private readonly passiveTransactionDataSerializer: Serializer,
  ) {}

  async execute(command: SyncTransactionsCommand): Promise<void> {
    for (
      let transactionIndex = 0;
      transactionIndex < command.block.transactions.length;
      transactionIndex++
    ) {
      const transactionJson = command.block.transactions[transactionIndex];
      const transactionSigner = await this.signer.recoverAddress(
        transactionJson,
      );
      const active = await this.activeTransactionDataSerializer.deserialize(
        transactionJson.active,
      );

      // Create Address (if not already created)
      await this.commandBus.execute(
        new CreateAddressCommand(transactionSigner),
      );

      if (transactionJson.passive) {
        const passive = await this.passiveTransactionDataSerializer.deserialize(
          transactionJson.passive,
        );

        console.log('Passive transaction data deserialized', passive);
      }

      await this.commandBus.execute(
        new CreateTransactionCommand(
          transactionJson.id,
          parseInt(command.blockHeight),
          <string>active.rc_limit,
          transactionSigner,
          transactionJson.signature_data,
          Array.isArray(active.operations) ? active.operations.length : 0,
          transactionIndex,
          <string>active.nonce,
        ),
      );

      await this.commandBus.execute(
        new SyncOperationsCommand(command.blockHeight, transactionJson),
      );
    }
  }
}
