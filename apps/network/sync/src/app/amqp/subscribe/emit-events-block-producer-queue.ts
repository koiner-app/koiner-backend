import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventLogger } from '@koiner/logger/domain';
import { BlockRewardCreatedMessage } from '@koiner/network/events';

@Injectable()
export class EmitEventsBlockProducerQueue {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2,
    private readonly eventLogger: EventLogger
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.network.channel.block_producer',
    },
    exchange: 'koiner.network.event',
    routingKey: `${BlockRewardCreatedMessage.eventName}.producer_queue`,
    queue: 'koiner.network.queue.block_producer',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const event = new BlockRewardCreatedMessage(JSON.parse(message));

      this.eventEmitter
        .emitAsync(
          `${BlockRewardCreatedMessage.eventName}.producer_queue`,
          event
        )
        .then(() => {
          resolve();
        })
        .catch((error) => {
          this.logger.error(
            'Could not process koiner.network.queue.block_producer message',
            error
          );
          this.logger.log('message', message);

          // Create event log for error
          this.eventLogger
            .error(
              {
                ...event,
                eventName: `${BlockRewardCreatedMessage.eventName}.producer_queue`,
              },
              error,
              event.blockHeight.toString()
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
