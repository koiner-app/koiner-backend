import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TransactionCreated } from '@koiner/chain/domain/transaction/event/transaction-created';

@EventsHandler(TransactionCreated)
export class UpdateTransactionStatsOnProjectCreated
  implements IEventHandler<TransactionCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(event: TransactionCreated): Promise<void> {
    console.log('TransactionCreated', event);
    // await this.commandBus.execute(
    //   new UpdateTransactionStatsCommand(event.transactionId, {
    //     projectCount: 1,
    //   }),
    // );
  }
}
