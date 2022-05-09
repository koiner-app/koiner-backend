import { DomainEventHandler } from '@appvise/domain';
import { Transaction, TransactionCreated } from '@koiner/chain/domain';
import { PubSubEngine } from '@koiner/pubsub-engine';
import { QueryBus } from '@nestjs/cqrs';
import { TransactionQuery } from '@koiner/chain/application/transaction/query';
import { TransactionNode } from '@koiner/chain/api/graphql/transaction/dto/transaction.node';

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
