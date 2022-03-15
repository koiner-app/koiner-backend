import { CommandBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { TransactionCreated } from '@koiner/chain/domain';
import { UpdateAddressStatsCommand } from '@koiner/chain/application/address/command/dto/update-address-stats.command';

@EventsHandler(TransactionCreated)
export class UpdateAddressStatsOnTransactionCreated
  implements IEventHandler<TransactionCreated>
{
  constructor(private commandBus: CommandBus) {}

  async handle(event: TransactionCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateAddressStatsCommand(event.payer, {
        transactionCount: 1,
      }),
    );
  }
}
