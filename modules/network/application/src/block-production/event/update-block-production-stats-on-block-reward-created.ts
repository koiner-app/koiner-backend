import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { OnEvent } from '@nestjs/event-emitter';
import { BlockRewardCreatedMessage } from '@koiner/network/events';
import { UpdateBlockProductionStatsCommand } from '../command';

@Injectable()
export class UpdateBlockProductionStatsOnBlockRewardCreated {
  constructor(private readonly commandBus: CommandBus) {}

  @OnEvent(`${BlockRewardCreatedMessage.routingKey}.production_stats_queue`, {
    async: false,
  })
  async handle(event: BlockRewardCreatedMessage): Promise<void> {
    await this.commandBus.execute(
      new UpdateBlockProductionStatsCommand({
        contractId: event.contractId,
        amountRewarded: event.value,
        burnedValue: event.burnedValue,
      })
    );
  }
}
