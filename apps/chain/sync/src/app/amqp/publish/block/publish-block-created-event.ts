import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { AfterBlockCreated } from '@koiner/chain/domain';
import { BlockCreatedMessage } from '@koiner/chain/events';

export class PublishBlockCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(AfterBlockCreated);
  }

  async handle(event: AfterBlockCreated): Promise<void> {
    const message = new BlockCreatedMessage({
      id: event.aggregateId,
      height: event.height,
      timestamp: event.timestamp,
      transactionCount: event.transactionCount,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.chain.event',
      BlockCreatedMessage.eventName,
      message.toString()
    );
  }
}
