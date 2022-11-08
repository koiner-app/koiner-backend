import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { BlockRewardReceived } from '@koiner/network/domain';
import { BlockRewardReceivedMessage } from '@koiner/network/events';

export class PublishBlockRewardReceivedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(BlockRewardReceived);
  }

  async handle(event: BlockRewardReceived): Promise<void> {
    const message = new BlockRewardReceivedMessage({
      isNewProducer: event.isNewProducer,
      addressId: event.addressId,
      contractId: event.contractId,
      balance: event.balance,
      rewardsReceived: event.rewardsReceived,
      mintedValue: event.mintedValue,
      burnedValue: event.burnedValue,
      mintedTotal: event.mintedTotal,
      burnedTotal: event.burnedTotal,
      publishedAt: Date.now(),
    });

    // Publish for production stats queue
    await this.amqpConnection.publish(
      'koiner.network.event',
      `${BlockRewardReceivedMessage.eventName}`,
      message.toString()
    );
  }
}
