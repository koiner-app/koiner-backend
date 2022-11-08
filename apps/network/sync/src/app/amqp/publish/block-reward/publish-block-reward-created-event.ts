import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { BlockRewardCreated } from '@koiner/network/domain';
import { BlockRewardCreatedMessage } from '@koiner/network/events';

export class PublishBlockRewardCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(BlockRewardCreated);
  }

  async handle(event: BlockRewardCreated): Promise<void> {
    const message = new BlockRewardCreatedMessage({
      blockHeight: event.blockHeight,
      contractId: event.contractId,
      producerId: event.producerId,
      value: event.value,
      mintedValue: event.mintedValue,
      burnedValue: event.burnedValue,
      publishedAt: Date.now(),
    });

    // Publish for producer queue
    await this.amqpConnection.publish(
      'koiner.network.event',
      `${BlockRewardCreatedMessage.eventName}`,
      message.toString()
    );
  }
}
