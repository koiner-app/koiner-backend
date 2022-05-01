import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokenOperationCreated, TokensOrigin } from '@koiner/contracts/domain';
import { UpdateTokenBalanceCommand } from '../command';

export class UpdateTokenBalancesOnOperationCreated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokenOperationCreated);
  }

  async handle(event: TokenOperationCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenBalanceCommand(
        event.to,
        event.contractId,
        event.value,
        event.name === 'mint' ? TokensOrigin.mint : TokensOrigin.transfer,
      ),
    );

    if (event.from) {
      await this.commandBus.execute(
        new UpdateTokenBalanceCommand(
          event.from,
          event.contractId,
          -event.value,
          TokensOrigin.transfer,
        ),
      );
    }
  }
}
