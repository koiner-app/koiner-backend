import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import {
  ContractOperationCreated,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { ContractOperationWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

export class PublishContractOperationCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(ContractOperationCreated);
  }

  async handle(event: ContractOperationCreated): Promise<void> {
    if (event.contractStandardType === ContractStandardType.token) {
      const message = new ContractOperationWithTokenTypeCreatedMessage({
        operationId: event.aggregateId,
        contractId: event.contractId,
        transactionId: event.transactionId,
        entryPoint: event.entryPoint,
        args: event.args,
        contractStandardType: event.contractStandardType,
        timestamp: event.timestamp,
        publishedAt: Date.now(),
      });

      await this.amqpConnection.publish(
        'koiner.contracts.event',
        ContractOperationWithTokenTypeCreatedMessage.routingKey,
        message.toString()
      );
    }
  }
}