import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { BlockRewardCreated, TokensOrigin } from '@koiner/contracts/domain';
import { UpdateTokenBalanceCommand } from '../command';

export class UpdateTokenBalanceOnBlockRewardCreated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(BlockRewardCreated);
  }

  async handle(event: BlockRewardCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateTokenBalanceCommand({
        addressId: event.producerId,
        contractId: event.contractId,
        amountChanged: event.value,
        tokensOrigin: TokensOrigin.blockReward,
      }),
    );
  }
}
