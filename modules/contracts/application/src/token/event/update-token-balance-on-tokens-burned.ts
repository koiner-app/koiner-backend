import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokensBurned } from '@koiner/contracts/domain';
import { UpdateTokenBalanceCommand } from '../command';

export class UpdateTokenBalanceOnTokensBurned extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokensBurned);
  }

  async handle(event: TokensBurned): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenBalanceCommand({
        addressId: event.from,
        contractId: event.contractId,
        amountChanged: -event.value,
      })
    );
  }
}
