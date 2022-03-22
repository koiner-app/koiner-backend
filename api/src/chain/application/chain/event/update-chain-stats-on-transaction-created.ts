import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TransactionCreated } from '@koiner/chain/domain';
// import { UpdateChainStatsCommand } from '@koiner/chain/application/chain/command/dto/update-chain-stats.command';

@EventsHandler(TransactionCreated)
export class UpdateChainStatsOnTransactionCreated
  implements IEventHandler<TransactionCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(event: TransactionCreated): Promise<void> {
    // await this.commandBus.execute(
    //   new UpdateChainStatsCommand(event.payer, {
    //     transactionCount: 1,
    //   }),
    // );
  }
}
