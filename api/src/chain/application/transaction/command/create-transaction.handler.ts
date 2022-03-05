import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import {
  Transaction,
  TransactionHeader,
  TransactionWriteRepository,
} from '@koiner/chain/domain';
import { CreateTransactionCommand } from './create-transaction.command';
import { KoinosId } from '@koiner/domain';

@CommandHandler(CreateTransactionCommand)
export class CreateTransactionHandler
  implements ICommandHandler<CreateTransactionCommand>
{
  constructor(
    private readonly writeRepository: TransactionWriteRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateTransactionCommand): Promise<void> {
    const transaction = this.eventPublisher.mergeObjectContext(
      Transaction.create(
        {
          blockHeight: command.blockHeight,
          header: new TransactionHeader({
            rcLimit: command.rcLimit,
            nonce: command.nonce,
            operationMerkleRoot: command.operationMerkleRoot,
            signer: command.signer,
          }),
          operationCount: command.operationCount,
          signature: command.signature,
          transactionIndex: command.transactionIndex,
        },
        new KoinosId(command.id),
      ),
    );

    await this.writeRepository.save(transaction);

    transaction.commit();
  }
}
