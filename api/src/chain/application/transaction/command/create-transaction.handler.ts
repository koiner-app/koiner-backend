import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Transaction, TransactionWriteRepository } from '@koiner/chain/domain';
import { CreateTransactionCommand } from './create-transaction.command';
import { KoinosId } from '@koiner/domain';
import { TransactionHeader } from '@koiner/chain/domain';

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
      await Transaction.create(
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
        command.id ? new KoinosId(command.id) : undefined,
      ),
    );

    await this.writeRepository.save(transaction);

    transaction.commit();
  }
}
