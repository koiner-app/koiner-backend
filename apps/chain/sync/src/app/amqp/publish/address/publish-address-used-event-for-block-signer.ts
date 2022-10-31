import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { BlockCreated } from '@koiner/chain/domain';
import { AddressUsedMessage } from '@koiner/chain/events';

export class PublishAddressUsedEventForBlockSigner extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(BlockCreated);
  }

  async handle(event: BlockCreated): Promise<void> {
    const message = new AddressUsedMessage({
      id: event.signer,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.chain.event',
      AddressUsedMessage.eventName,
      message.toString()
    );
  }
}
