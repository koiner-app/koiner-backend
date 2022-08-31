import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokensBurned } from '@koiner/contracts/domain';
import { UpdateTokenHolderCommand } from '../command';

export class UpdateTokenHolderOnTokensBurned extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokensBurned);
  }

  async handle(event: TokensBurned): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenHolderCommand({
        addressId: event.from,
        contractId: event.contractId,
        amountChanged: -event.value,
      })
    );
  }
}
