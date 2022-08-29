import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokensTransferred } from '@koiner/contracts/domain';
import { UpdateTokenBalanceCommand } from '../command';

export class UpdateTokenBalancesOnTokensTransfered extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokensTransferred);
  }

  async handle(event: TokensTransferred): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenBalanceCommand({
        addressId: event.to,
        contractId: event.contractId,
        amountChanged: event.value,
      })
    );

    await this.commandBus.execute(
      new UpdateTokenBalanceCommand({
        addressId: event.from,
        contractId: event.contractId,
        amountChanged: -event.value,
      })
    );
  }
}
