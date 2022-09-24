import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { ContractCreated } from '@koiner/contracts/domain';
import { AddressUsedMessage } from '@koiner/chain/events';

export class PublishAddressUsedForContract extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(ContractCreated);
  }

  async handle(event: ContractCreated): Promise<void> {
    const message = new AddressUsedMessage({
      id: event.aggregateId,
      isContract: true,
      publishedAt: Date.now(),
    });

    await this.amqpConnection.publish(
      'koiner.contracts.event',
      AddressUsedMessage.routingKey,
      message.toString()
    );
  }
}
