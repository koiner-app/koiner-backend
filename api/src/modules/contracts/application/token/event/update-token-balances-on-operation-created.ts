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
      new UpdateTokenBalanceCommand({
        addressId: event.to,
        contractId: event.contractId,
        amountChanged: event.value,
        tokensOrigin:
          event.name === 'mint' ? TokensOrigin.mint : TokensOrigin.transfer,
      }),
    );

    if (event.from) {
      await this.commandBus.execute(
        new UpdateTokenBalanceCommand({
          addressId: event.from,
          contractId: event.contractId,
          amountChanged: -event.value,
          tokensOrigin: TokensOrigin.transfer,
        }),
      );
    }
  }
}
