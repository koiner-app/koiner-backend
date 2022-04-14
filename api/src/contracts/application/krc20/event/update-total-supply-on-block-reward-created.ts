import { CommandBus } from '@nestjs/cqrs';
import { BlockRewardCreated } from '@koiner/contracts/domain';
import { UpdateKrc20TotalSupplyCommand } from '../command';
import { DomainEventHandler, Logger } from '@appvise/domain';

export class UpdateTotalSupplyOnBlockRewardCreated extends DomainEventHandler {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly logger: Logger,
  ) {
    super(BlockRewardCreated);
  }

  async handle(event: BlockRewardCreated): Promise<void> {
    this.logger.debug(
      `${event.contractId}, ${event.value}`,
      'UpdateTotalSupplyOnBlockRewardCreated',
    );

    await this.commandBus.execute(
      new UpdateKrc20TotalSupplyCommand(event.contractId, event.value),
    );
  }
}
