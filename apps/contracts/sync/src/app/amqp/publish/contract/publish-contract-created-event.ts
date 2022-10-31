import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { ContractStandardType } from '@koiner/contracts/standards';
import { ContractCreated } from '@koiner/contracts/domain';
import { ContractWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

export class PublishContractCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(ContractCreated);
  }

  async handle(event: ContractCreated): Promise<void> {
    if (event.contractStandardType === ContractStandardType.token) {
      const message = new ContractWithTokenTypeCreatedMessage({
        contractId: event.aggregateId,
        contractStandardType: event.contractStandardType,
        timestamp: event.timestamp,
        publishedAt: Date.now(),
      });

      await this.amqpConnection.publish(
        'koiner.contracts.event',
        ContractWithTokenTypeCreatedMessage.eventName,
        message.toString()
      );
    }
  }
}
