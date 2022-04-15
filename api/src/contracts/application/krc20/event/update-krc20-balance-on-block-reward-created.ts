import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { BlockRewardCreated, TokensOrigin } from '@koiner/contracts/domain';
import { UpdateKrc20BalanceCommand } from '../command';

export class UpdateKrc20BalanceOnBlockRewardCreated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(BlockRewardCreated);
  }

  async handle(event: BlockRewardCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateKrc20BalanceCommand(
        event.producerId,
        event.contractId,
        event.value,
        TokensOrigin.blockReward,
      ),
    );
  }
}
