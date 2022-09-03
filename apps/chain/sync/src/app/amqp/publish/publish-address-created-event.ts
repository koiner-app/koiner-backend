import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { AddressCreated } from '@koiner/chain/domain';
import { AddressCreatedMessage } from '@koiner/chain/events';

export class PublishAddressCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(AddressCreated);
  }

  async handle(event: AddressCreated): Promise<void> {
    const message = new AddressCreatedMessage({
      id: event.aggregateId,
      isProducer: event.isProducer,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.chain.events',
      AddressCreatedMessage.routingKey,
      message.toString()
    );
  }
}
