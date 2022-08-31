import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KoinosId } from '@koiner/domain';
import {
  Transaction,
  TransactionHeader,
  TransactionWriteRepository,
} from '@koiner/chain/domain';
import { CreateTransactionCommand } from './dto/create-transaction.command';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(private readonly writeRepository: TransactionWriteRepository) {}

  async execute(command: CreateTransactionCommand): Promise<void> {
    const transaction = Transaction.create(
      {
        blockHeight: command.blockHeight,
        header: new TransactionHeader({
          rcLimit: command.rcLimit,
          nonce: command.nonce,
          operationMerkleRoot: command.operationMerkleRoot,
          payer: command.payer,
        }),
        operationCount: command.operationCount,
        signature: command.signature,
        transactionIndex: command.transactionIndex,
        timestamp: command.timestamp,
      },
      new KoinosId(command.id)
    );

    await this.writeRepository.save(transaction);
  }
}
