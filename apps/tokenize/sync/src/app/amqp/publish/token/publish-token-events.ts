import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { TokenEventCreated } from '@koiner/tokenize/domain';
import {
  TokensBurnedEventMessage,
  TokensMintedEventMessage,
  TokensTransferredEventMessage,
} from '@koiner/tokenize/events';

export class PublishTokenEvents extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(TokenEventCreated);
  }

  async handle(event: TokenEventCreated): Promise<void> {
    const props = {
      id: event.aggregateId,
      contractId: event.contractId,
      name: event.name,
      from: event.from,
      to: event.to,
      value: event.value,
      timestamp: event.timestamp,
      publishedAt: Date.now(),
    };

    let routingKey = '';
    let message;

    if (event.name === 'burn') {
      message = new TokensBurnedEventMessage(props);
      routingKey = TokensBurnedEventMessage.routingKey;
    }

    if (event.name === 'mint') {
      message = new TokensMintedEventMessage(props);
      routingKey = TokensMintedEventMessage.routingKey;
    }

    if (event.name === 'transfer') {
      message = new TokensTransferredEventMessage(props);
      routingKey = TokensTransferredEventMessage.routingKey;
    }

    await this.amqpConnection.publish(
      'koiner.tokenize.event',
      routingKey,
      message.toString()
    );
  }
}
