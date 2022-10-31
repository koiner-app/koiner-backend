import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { BlockProducerCreated } from '@koiner/network/domain';
import { AddressUsedMessage } from '@koiner/chain/events';

export class PublishAddressUsedForNewBlockProducer extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(BlockProducerCreated);
  }

  async handle(event: BlockProducerCreated): Promise<void> {
    const message = new AddressUsedMessage({
      id: event.addressId,
      isProducer: true,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.network.event',
      AddressUsedMessage.eventName,
      message.toString()
    );
  }
}
