import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { ContractStandardType } from '@koiner/contracts/standards';
import { ContractOperationCreated } from '@koiner/contracts/domain';
import { ContractOperationWithTokenTypeCreatedMessage } from '@koiner/contracts/events';

export class PublishContractOperationCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(ContractOperationCreated);
  }

  async handle(event: ContractOperationCreated): Promise<void> {
    if (event.contractStandardType === ContractStandardType.token) {
      const message = new ContractOperationWithTokenTypeCreatedMessage({
        operationId: event.aggregateId,
        blockHeight: event.blockHeight,
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
        ContractOperationWithTokenTypeCreatedMessage.eventName,
        message.toString()
      );
    }
  }
}
