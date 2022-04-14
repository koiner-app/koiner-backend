import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler, Logger } from '@appvise/domain';
import { Krc20BalanceCreated } from '@koiner/contracts/domain';
import { UpdateKrc20ContractStatsCommand } from '../command';

export class UpdateHolderCountOnKrc20BalanceCreated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
  ) {
    super(Krc20BalanceCreated);
  }

  async handle(event: Krc20BalanceCreated): Promise<void> {
    this.logger.log(
      `${event.contractId}, ${event.balance}, ${event.addressId}`,
      'UpdateHolderCountOnKrc20BalanceCreated',
    );

    await this.commandBus.execute(
      new UpdateKrc20ContractStatsCommand(event.contractId, {
        holderCount: 1,
      }),
    );
  }
}
