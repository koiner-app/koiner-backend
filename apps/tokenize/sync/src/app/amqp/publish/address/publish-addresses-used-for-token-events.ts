import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { TokenEventCreated } from '@koiner/tokenize/domain';
import { AddressUsedMessage } from '@koiner/chain/events';

export class PublishAddressesUsedForTokenEvents extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(TokenEventCreated);
  }

  async handle(event: TokenEventCreated): Promise<void> {
    if (event.from) {
      const message = new AddressUsedMessage({
        id: event.from,
        publishedAt: Date.now(),
      });

      await this.amqpConnection.publish(
        'koiner.tokenize.event',
        AddressUsedMessage.eventName,
        message.toString()
      );
    }

    if (event.to) {
      const message = new AddressUsedMessage({
        id: event.to,
        publishedAt: Date.now(),
      });

      await this.amqpConnection.publish(
        'koiner.tokenize.event',
        AddressUsedMessage.eventName,
        message.toString()
      );
    }
  }
}
