import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokensMinted } from '@koiner/contracts/domain';
import { UpdateTokenBalanceCommand } from '../command';

export class UpdateTokenBalanceOnTokensMinted extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokensMinted);
  }

  async handle(event: TokensMinted): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenBalanceCommand({
        addressId: event.to,
        contractId: event.contractId,
        amountChanged: event.value,
      })
    );
  }
}
