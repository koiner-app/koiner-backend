import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { TokenEventCreated } from '@koiner/tokenize/domain';
import {
  TokensBurnedEventMessage,
  TokensMintedEventMessage,
  TokensTransferredEventMessage,
} from '@koiner/tokenize/events';
import { AmqpChannelPostfixes, AmqpTokenChannels } from '../..';

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
     * Publish to routingKeys grouped by last char of address or
     * contractId. This way we can split the work among multiple
     * queues and still process them synchronously.
     */

    /**
     * Publish for total supply queues
     */
    let contractIdSuffix: string;

    // Check if event if from token with separate a channel
    const tokenChannel = AmqpTokenChannels.find(
      (_tokenChannel) => _tokenChannel.contractId === event.contractId
    );

    if (tokenChannel) {
      contractIdSuffix = tokenChannel.suffix;
    }

    // Otherwise use the last char of the contractId
    if (!contractIdSuffix) {
      const lastCharContractId =
        event.contractId[event.contractId.length - 1].toLowerCase();

      contractIdSuffix = AmqpChannelPostfixes.find((_suffix) =>
        _suffix.includes(lastCharContractId)
      );
    }

    await this.amqpConnection.publish(
      'koiner.tokenize.event',
      `${routingKey}.token.${contractIdSuffix}`,
      message.toString()
    );

    /**
     * Publish for token holder queues
     */
    if (event.to) {
      const lastCharTo = event.to[event.to.length - 1].toLowerCase();

      const toSuffix = AmqpChannelPostfixes.find((_suffix) =>
        _suffix.includes(lastCharTo)
      );

      await this.amqpConnection.publish(
        'koiner.tokenize.event',
        `${routingKey}.to.${toSuffix}`,
        message.toString()
      );
    }

    if (event.from) {
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
