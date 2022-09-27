import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateBlockProducerCommand } from '../command';
import { OnEvent } from '@nestjs/event-emitter';
import { BlockRewardCreatedMessage } from '@koiner/network/events';

@Injectable()
export class UpdateBlockProducerOnBlockRewardCreated {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(BlockRewardCreatedMessage.routingKey, { async: false })
  async handle(event: BlockRewardCreatedMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateBlockProducerCommand({
        addressId: event.producerId,
        contractId: event.contractId,
        amountChanged: event.value,
      })
    );
  }
}
