import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import { OperationCreatedMessage } from '@koiner/chain/events';

export class PublishOperationCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    // We only need publish ContractOperations
    if (event.type === OperationType.contractOperation) {
      const message = new OperationCreatedMessage({
        operationId: event.aggregateId,
        blockHeight: event.blockHeight,
        transactionId: event.transactionId,
        operationIndex: event.operationIndex,
        type: event.type,
        timestamp: event.timestamp,
        operationData: event.operationData,
        publishedAt: Date.now(),
      });

      await this.amqpConnection.publish(
        'koiner.chain.event',
        OperationCreatedMessage.routingKey,
        message.toString()
      );
    }
  }
}
