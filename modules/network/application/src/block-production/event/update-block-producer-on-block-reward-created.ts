import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { BlockRewardCreatedMessage } from '@koiner/network/events';
import { UpdateBlockProducerCommand } from '../command';

@Injectable()
export class UpdateBlockProducerOnBlockRewardCreated {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(BlockRewardCreatedMessage.eventName, {
    async: false,
  })
  async handle(event: BlockRewardCreatedMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateBlockProducerCommand({
        addressId: event.producerId,
        contractId: event.contractId,
        mintedValue: event.mintedValue,
        burnedValue: event.burnedValue,
        lastProducedBlock: event.blockHeight,
      })
    );
  }
}
