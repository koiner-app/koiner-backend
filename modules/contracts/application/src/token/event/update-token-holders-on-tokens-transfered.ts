import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokensTransferred } from '@koiner/contracts/domain';
import { UpdateTokenHolderCommand } from '../command';

export class UpdateTokenHoldersOnTokensTransfered extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokensTransferred);
  }

  async handle(event: TokensTransferred): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenHolderCommand({
        addressId: event.to,
        contractId: event.contractId,
        amountChanged: event.value,
      })
    );

    await this.commandBus.execute(
      new UpdateTokenHolderCommand({
        addressId: event.from,
        contractId: event.contractId,
        amountChanged: -event.value,
      })
    );
  }
}
