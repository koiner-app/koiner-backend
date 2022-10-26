import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { BlockWithTransactionsCreated } from '@koiner/chain/domain';
import { BlockWithTransactionsCreatedMessage } from '@koiner/chain/events';

export class PublishBlockWithTransactionsCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(BlockWithTransactionsCreated);
  }

  async handle(event: BlockWithTransactionsCreated): Promise<void> {
    const message = new BlockWithTransactionsCreatedMessage({
      id: event.aggregateId,
      height: event.height,
      timestamp: event.timestamp,
      transactionCount: event.transactionCount,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.chain.event',
      BlockWithTransactionsCreatedMessage.routingKey,
      message.toString()
    );
  }
}
