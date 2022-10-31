import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { TokenContractCreated } from '@koiner/tokenize/domain';
import { AddressUsedMessage } from '@koiner/chain/events';

export class PublishAddressUsedForTokenContract extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(TokenContractCreated);
  }

  async handle(event: TokenContractCreated): Promise<void> {
    const message = new AddressUsedMessage({
      id: event.aggregateId,
      isContract: true,
      isTokenContract: true,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.tokenize.event',
      AddressUsedMessage.eventName,
      message.toString()
    );
  }
}
