import { Injectable } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Logger } from '@appvise/domain';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AddressUsedMessage } from '@koiner/chain/events';

@Injectable()
export class EmitChainAddressUsedQueueEvents {
  constructor(
    private readonly logger: Logger,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @RabbitSubscribe({
    queueOptions: {
      channel: 'koiner.chain.channel.address',
    },
    exchange: 'koiner.chain.event',
    routingKey: AddressUsedMessage.eventName,
    queue: 'koiner.chain.queue.address',
  })
  async handle(message: any): Promise<void> {
    return new Promise((resolve) => {
      const event = new AddressUsedMessage(JSON.parse(message));

      this.eventEmitter
        .emitAsync(AddressUsedMessage.eventName, event)
        .then(() => {
          resolve();
        })
        .catch(() => {
          this.logger.error(
            'Could not process koiner.chain.queue.address message (from chain)'
          );
          resolve();
        });
    });
  }
}
