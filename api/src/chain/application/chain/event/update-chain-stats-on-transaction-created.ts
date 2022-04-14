import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TransactionCreated } from '@koiner/chain/domain';
import { UpdateChainStatsCommand } from '@koiner/chain/application/chain/command/dto/update-chain-stats.command';
import { koinos } from '@config';

export class UpdateChainStatsOnTransactionCreated extends DomainEventHandler {
  constructor(private commandBus: CommandBus) {
    super(TransactionCreated);
  }

  async handle(event: TransactionCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateChainStatsCommand(koinos.chainId, {
        transactionCount: 1,
        operationCount: event.operationCount,
      }),
    );
  }
}
