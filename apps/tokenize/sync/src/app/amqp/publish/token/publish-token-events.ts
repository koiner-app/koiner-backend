import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { TokenEventCreated } from '@koiner/tokenize/domain';
import {
  TokensBurnedEventMessage,
  TokensMintedEventMessage,
  TokensTransferredEventMessage,
} from '@koiner/tokenize/events';
import { AmqpChannelPostfixes } from '../..';

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
      routingKey = TokensBurnedEventMessage.eventName;
    }

    if (event.name === 'mint') {
      message = new TokensMintedEventMessage(props);
      routingKey = TokensMintedEventMessage.eventName;
    }

    if (event.name === 'transfer') {
      message = new TokensTransferredEventMessage(props);
      routingKey = TokensTransferredEventMessage.eventName;
    }

    await this.amqpConnection.publish(
      'koiner.tokenize.event',
      routingKey,
      message.toString()
    );

    /**
     * Also publish to routingKeys grouped by last char of address.
     * This way we can split the work among multiple queues and
     * still process them synchronously.
     */
    let lastChar: string;

    if (event.name === 'burn') {
      lastChar = event.from[event.from.length - 1].toLowerCase();
    } else {
      lastChar = event.to[event.to.length - 1].toLowerCase();
    }

    const suffix = AmqpChannelPostfixes.find((_suffix) =>
      _suffix.includes(lastChar)
    );

    await this.amqpConnection.publish(
      'koiner.tokenize.event',
      `${routingKey}.${suffix}`,
      message.toString()
    );

    // Publish separate message for sender because it must be
    // processed by their own token holder address group queue
    if (event.name === 'transfer') {
      const lastCharFrom = event.from[event.from.length - 1].toLowerCase();

      const fromSuffix = AmqpChannelPostfixes.find((_suffix) =>
        _suffix.includes(lastCharFrom)
      );

      await this.amqpConnection.publish(
        'koiner.tokenize.event',
        `${routingKey}.from.${fromSuffix}`,
        message.toString()
      );
    }
  }
}
