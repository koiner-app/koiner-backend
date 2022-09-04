import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { AddressMarkedAsProducer } from '@koiner/contracts/domain';
import { AddressMarkedAsProducerMessage } from '@koiner/contracts/events';

export class PublishAddressMarkedAsProducerEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(AddressMarkedAsProducer);
  }

  async handle(event: AddressMarkedAsProducer): Promise<void> {
    const message = new AddressMarkedAsProducerMessage({
      id: event.aggregateId,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.contracts.event',
      AddressMarkedAsProducerMessage.routingKey,
      message.toString()
    );
  }
}
