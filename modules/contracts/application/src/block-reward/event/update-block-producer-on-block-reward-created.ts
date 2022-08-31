import { CommandBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { BlockRewardCreated } from '@koiner/contracts/domain';
import { UpdateBlockProducerCommand } from '../command';

export class UpdateBlockProducerOnBlockRewardCreated extends DomainEventHandler {
  constructor(private readonly commandBus: CommandBus) {
    super(BlockRewardCreated);
  }

  async handle(event: BlockRewardCreated): Promise<void> {
    await this.commandBus.execute(
      new UpdateBlockProducerCommand({
        addressId: event.producerId,
        contractId: event.contractId,
        amountChanged: event.value,
      })
    );
  }
}
