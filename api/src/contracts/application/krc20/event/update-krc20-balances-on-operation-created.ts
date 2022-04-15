import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { Krc20OperationCreated, TokensOrigin } from '@koiner/contracts/domain';
import { UpdateKrc20BalanceCommand } from '../command';

export class UpdateKrc20BalancesOnOperationCreated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(Krc20OperationCreated);
  }

  async handle(event: Krc20OperationCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateKrc20BalanceCommand(
        event.to,
        event.contractId,
        event.value,
        event.name === 'mint' ? TokensOrigin.mint : TokensOrigin.transfer,
      ),
    );

    if (event.from) {
      await this.commandBus.execute(
        new UpdateKrc20BalanceCommand(
          event.from,
          event.contractId,
          -event.value,
          TokensOrigin.transfer,
        ),
      );
    }
  }
}
