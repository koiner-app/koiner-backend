import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { DomainEventHandler } from '@appvise/domain';
import { OperationCreated } from '@koiner/chain/domain';
import { OperationCreatedMessage } from '@koiner/chain/events';

export class PublishOperationCreatedEvent extends DomainEventHandler {
  constructor(private readonly amqpConnection: AmqpConnection) {
    super(OperationCreated);
  }

  async handle(event: OperationCreated): Promise<void> {
    const message = new OperationCreatedMessage({
      operationId: event.aggregateId,
      blockHeight: event.blockHeight,
      transactionId: event.transactionId,
      operationIndex: event.operationIndex,
      type: event.type,
    });

    await this.amqpConnection.publish(
      'koiner.chain.sync',
      OperationCreatedMessage.routingKey,
      message.toString()
    );
  }
}
