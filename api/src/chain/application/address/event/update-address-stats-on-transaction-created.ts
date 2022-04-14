import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TransactionCreated } from '@koiner/chain/domain';
import { UpdateAddressStatsCommand } from '@koiner/chain/application/address/command/dto/update-address-stats.command';

export class UpdateAddressStatsOnTransactionCreated extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(TransactionCreated);
  }

  async handle(event: TransactionCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateAddressStatsCommand(event.payer, {
        transactionCount: 1,
      }),
    );
  }
}
