import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { TokenContractCreated } from '@koiner/tokenize/domain';
import { TokenContractCreatedMessage } from '@koiner/tokenize/events';

export class PublishTokenContractCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(TokenContractCreated);
  }

  async handle(event: TokenContractCreated): Promise<void> {
    const message = new TokenContractCreatedMessage({
      id: event.aggregateId,
      contractId: event.id,
      name: event.name,
      symbol: event.symbol,
      decimals: event.decimals,
      totalSupply: event.totalSupply,
      timestamp: event.timestamp,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.tokenize.event',
      TokenContractCreatedMessage.eventName,
      message.toString()
    );
  }
}
