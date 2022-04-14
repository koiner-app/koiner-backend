import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  Operation,
  Transaction,
  TransactionHeader,
  TransactionWriteRepository,
} from '@koiner/chain/domain';
import { CreateTransactionCommand } from './dto/create-transaction.command';
import { KoinosId } from '@koiner/domain';

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
        operations: command.operations.map((operationProps) =>
          Operation.create(operationProps, operationProps.parentId),
        ),
        operationCount: command.operations.length,
        signature: command.signature,
        transactionIndex: command.transactionIndex,
      },
      new KoinosId(command.id),
    );

    await this.writeRepository.save(transaction);
  }
}
