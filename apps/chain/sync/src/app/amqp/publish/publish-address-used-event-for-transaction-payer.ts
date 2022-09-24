import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { TransactionCreated } from '@koiner/chain/domain';
import { AddressUsedMessage } from '@koiner/chain/events';

export class PublishAddressUsedEventForTransactionPayer extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(TransactionCreated);
  }

  async handle(event: TransactionCreated): Promise<void> {
    const message = new AddressUsedMessage({
      id: event.payer,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.chain.event',
      AddressUsedMessage.routingKey,
      message.toString()
    );
  }
}
