import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { TokensBurned } from '@koiner/contracts/domain';
import { UpdateTokenContractCommand } from '../command';

export class UpdateTokenSupplyOnTokensBurned extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(TokensBurned);
  }

  async handle(event: TokensBurned): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenContractCommand({
        contractId: event.contractId,
        burnedTokens: event.value,
      })
    );
  }
}
