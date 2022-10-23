import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BlockRewardCreatedMessage } from '@koiner/network/events';

@Injectable()
export class EmitEventsBlockProductionStatsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.network.channel.block_production_stats',
    },
    exchange: 'koiner.network.event',
    routingKey: `${BlockRewardCreatedMessage.routingKey}.production_stats_queue`,
    queue: 'koiner.network.queue.block_production_stats',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new BlockRewardCreatedMessage(JSON.parse(message));

      this.eventEmitter
        .emitAsync(
          `${BlockRewardCreatedMessage.routingKey}.production_stats_queue`,
          event
        )
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.network.queue.block_production message',
            error
          );
          this.logger.log('message', message);
          reject();
        });
    });
  }
}
