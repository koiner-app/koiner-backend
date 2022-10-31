import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { ContractEventCreated } from '@koiner/contracts/domain';
import { ContractStandardType } from '@koiner/contracts/standards';
import { ContractEventWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

export class PublishContractEventCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(ContractEventCreated);
  }

  async handle(event: ContractEventCreated): Promise<void> {
    if (event.contractStandardType === ContractStandardType.token) {
      const message = new ContractEventWithTokenTypeCreatedMessage({
        eventId: event.aggregateId,
        blockHeight: event.blockHeight,
        parentId: event.parentId,
        parentType: event.parentType,
        sequence: event.sequence,
        contractId: event.contractId,
        contractStandardType: event.contractStandardType,
        name: event.name,
        data: event.data,
        impacted: event.impacted,
        timestamp: event.timestamp,
        publishedAt: Date.now(),
      });

      await this.amqpConnection.publish(
        'koiner.contracts.event',
        ContractEventWithTokenTypeCreatedMessage.eventName,
        message.toString()
      );
    }
  }
}
