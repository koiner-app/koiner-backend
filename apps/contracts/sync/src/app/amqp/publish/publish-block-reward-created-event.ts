import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { BlockRewardCreated } from '@koiner/contracts/domain';
import { BlockRewardCreatedMessage } from '@koiner/contracts/events';

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
    });

    await this.amqpConnection.publish(
      'koiner.contracts.events',
      BlockRewardCreatedMessage.routingKey,
      message.toString()
    );
  }
}
