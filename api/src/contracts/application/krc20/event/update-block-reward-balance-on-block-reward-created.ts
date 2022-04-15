import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { BlockRewardCreated } from '@koiner/contracts/domain';
import { UpdateBlockRewardBalanceCommand } from '../command';

export class UpdateBlockRewardBalanceOnBlockRewardCreated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(BlockRewardCreated);
  }

  async handle(event: BlockRewardCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateBlockRewardBalanceCommand(
        event.producerId,
        event.contractId,
        event.value,
      ),
    );
  }
}
