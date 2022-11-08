import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { BlockRewardReceivedMessage } from '@koiner/network/events';
import { UpdateBlockProductionStatsCommand } from '../command';

@Injectable()
export class UpdateBlockProductionStatsOnBlockRewardReceived {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(BlockRewardReceivedMessage.eventName, {
    async: false,
  })
  async handle(event: BlockRewardReceivedMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateBlockProductionStatsCommand({
        isNewProducer: event.isNewProducer,
        contractId: event.contractId,
        mintedValue: event.mintedValue,
        burnedValue: event.burnedValue,
      })
    );
  }
}
