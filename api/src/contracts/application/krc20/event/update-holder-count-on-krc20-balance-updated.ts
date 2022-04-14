import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler, Logger } from '@appvise/domain';
import { Krc20BalanceUpdated } from '@koiner/contracts/domain';
import { UpdateKrc20ContractStatsCommand } from '../command';

export class UpdateHolderCountOnKrc20BalanceUpdated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
  ) {
    super(Krc20BalanceUpdated);
  }

  async handle(event: Krc20BalanceUpdated): Promise<void> {
    if (event.balance === 0) {
      this.logger.log(
        `${event.contractId}, ${event.balance}, ${event.amountChanged}`,
        'UpdateHolderCountOnKrc20BalanceUpdated',
      );

      // Address is not holding any tokens anymore
      await this.commandBus.execute(
        new UpdateKrc20ContractStatsCommand(event.contractId, {
          holderCount: -1,
        }),
      );
    }
  }
}
