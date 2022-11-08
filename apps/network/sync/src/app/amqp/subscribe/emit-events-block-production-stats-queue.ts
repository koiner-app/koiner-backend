import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventLogger } from '@koiner/logger/domain';
import { BlockRewardReceivedMessage } from '@koiner/network/events';

@Injectable()
export class EmitEventsBlockProductionStatsQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventLogger: EventLogger
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.network.channel.block_production_stats',
    },
    exchange: 'koiner.network.event',
    routingKey: `${BlockRewardReceivedMessage.eventName}`,
    queue: 'koiner.network.queue.block_production_stats',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new BlockRewardReceivedMessage(JSON.parse(message));

      this.eventEmitter
        .emitAsync(`${BlockRewardReceivedMessage.eventName}`, event)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.network.queue.block_production message',
            error
          );
          this.logger.log('message', message);

          // Create event log for error
          this.eventLogger
            .error(
              {
                ...event,
                eventName: `${BlockRewardReceivedMessage.eventName}`,
              },
              error
            )
            .then((eventLog) => {
              // Reject with small delay based on occurrences of error
              setTimeout(
                () => {
                  reject();
                },
                eventLog.count < 10 ? 2000 : 120000
              );
            });
        });
    });
  }
}
