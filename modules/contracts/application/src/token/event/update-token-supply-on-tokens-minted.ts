import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokensMinted } from '@koiner/contracts/domain';
import { UpdateTokenContractCommand } from '../command';

export class UpdateTokenSupplyOnTokensMinted extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokensMinted);
  }

  async handle(event: TokensMinted): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenContractCommand({
        contractId: event.contractId,
        mintedTokens: event.value,
      })
    );
  }
}
