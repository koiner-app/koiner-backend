import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { TransactionCreated } from '@koiner/chain/domain';
import { TransactionCreatedMessage } from '@koiner/chain/events';

export class PublishTransactionCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(TransactionCreated);
  }

  async handle(event: TransactionCreated): Promise<void> {
    const message = new TransactionCreatedMessage({
      id: event.aggregateId,
      blockHeight: event.blockHeight,
      payer: event.payer,
      operationCount: event.operationCount,
      timestamp: event.timestamp,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.chain.event',
      TransactionCreatedMessage.eventName,
      message.toString()
    );
  }
}
