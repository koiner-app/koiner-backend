import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KoinosId } from '@koiner/domain';
import {
  Transaction,
  TransactionHeader,
  TransactionReceipt,
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
        header: new TransactionHeader(command.header),
        receipt: new TransactionReceipt(command.receipt),
        operationCount: command.operationCount,
        signatures: command.signatures,
        transactionIndex: command.transactionIndex,
        timestamp: command.timestamp,
      },
      new KoinosId(command.id)
    );

    await this.writeRepository.save(transaction);
  }
}
