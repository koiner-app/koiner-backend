import { QueryBus } from '@nestjs/cqrs';
import { DomainEventHandler } from '@appvise/domain';
import { PubSubEngine } from '@koiner/pubsub-engine';
import { Transaction, TransactionCreated } from '@koiner/chain/domain';
import { TransactionQuery } from '@koiner/chain/application';
import { TransactionNode } from '../dto';

export class PublishTransactionCreatedEvent extends DomainEventHandler {
  constructor(
    private readonly pubSub: PubSubEngine,
    private readonly queryBus: QueryBus,
  ) {
    super(TransactionCreated);
  }

  async handle(event: TransactionCreated): Promise<void> {
    const transaction = await this.queryBus.execute<
      TransactionQuery,
      Transaction
    >(new TransactionQuery(event.aggregateId));

    await this.pubSub.publish('transactionCreated', {
      transactionCreated: new TransactionNode(transaction),
    });
  }
}
