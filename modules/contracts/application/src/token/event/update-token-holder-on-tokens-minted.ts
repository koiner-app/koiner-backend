import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokensMinted } from '@koiner/contracts/domain';
import { UpdateTokenHolderCommand } from '../command';

export class UpdateTokenHolderOnTokensMinted extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokensMinted);
  }

  async handle(event: TokensMinted): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenHolderCommand({
        addressId: event.to,
        contractId: event.contractId,
        amountChanged: event.value,
      })
    );
  }
}
