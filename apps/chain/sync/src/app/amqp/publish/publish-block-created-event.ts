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
      height: event.height,
      timestamp: event.timestamp,
      transactionCount: event.transactionCount,
    });

    await this.amqpConnection.publish(
      'koiner.chain.sync',
      BlockCreatedMessage.routingKey,
      message.toString()
    );
  }
}
