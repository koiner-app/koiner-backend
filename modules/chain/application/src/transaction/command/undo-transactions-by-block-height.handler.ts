import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  TransactionReadRepository,
  TransactionWriteRepository,
} from '@koiner/chain/domain';
import { UndoTransactionsByBlockHeightCommand } from './dto/undo-transactions-by-block-height.command';

@CommandHandler(UndoTransactionsByBlockHeightCommand)
export class UndoTransactionsByBlockHeightHandler
  implements ICommandHandler<UndoTransactionsByBlockHeightCommand>
{
  constructor(
    private readonly readRepository: TransactionReadRepository,
    private readonly writeRepository: TransactionWriteRepository
  ) {}

  async execute(command: UndoTransactionsByBlockHeightCommand): Promise<void> {
    const transactions = await this.readRepository.find({
      first: 100,
      filter: {
        OR: command.blockHeights.map((blockHeight) => {
          return {
            blockHeight: { equals: blockHeight },
          };
        }),
      },
    });

    for (const transaction of transactions.results) {
      await this.writeRepository.delete(transaction.item);
    }
  }
}
