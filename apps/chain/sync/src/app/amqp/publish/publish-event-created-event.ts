import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { EventCreated } from '@koiner/chain/domain';
import { EventCreatedMessage } from '@koiner/chain/events';

export class PublishEventCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(EventCreated);
  }

  async handle(event: EventCreated): Promise<void> {
    // We only need to publish contract events
    if (event.contractId) {
      const message = new EventCreatedMessage({
        id: event.aggregateId,
        parentId: event.parentId,
        parentType: event.parentType,
        sequence: event.sequence,
        contractId: event.contractId,
        name: event.name,
        data: event.data,
        impacted: event.impacted,
        timestamp: event.timestamp,
        publishedAt: Date.now(),
      });

      await this.amqpConnection.publish(
        'koiner.chain.event',
        EventCreatedMessage.routingKey,
        message.toString()
      );
    }
  }
}
