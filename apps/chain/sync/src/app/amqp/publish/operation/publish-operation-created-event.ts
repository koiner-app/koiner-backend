import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated, OperationType } from '@koiner/chain/domain';
import {
  ContractOperationCreatedMessage,
  OperationCreatedMessage,
} from '@koiner/chain/events';

export class PublishOperationCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    const props = {
      operationId: event.aggregateId,
      blockHeight: event.blockHeight,
      transactionId: event.transactionId,
      operationIndex: event.operationIndex,
      type: event.type,
      timestamp: event.timestamp,
      operationData: event.operationData,
      publishedAt: Date.now(),
    };

    const message = new OperationCreatedMessage(props);

    await this.amqpConnection.publish(
      'koiner.chain.event',
      OperationCreatedMessage.routingKey,
      message.toString()
    );

    if (event.type === OperationType.contractOperation) {
      const message2 = new ContractOperationCreatedMessage(props);

      await this.amqpConnection.publish(
        'koiner.chain.event',
        ContractOperationCreatedMessage.routingKey,
        message2.toString()
      );
    }
  }
}
