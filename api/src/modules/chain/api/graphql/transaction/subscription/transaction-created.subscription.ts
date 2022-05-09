import { Resolver, Subscription } from '@nestjs/graphql';
import { TransactionNode } from '@koiner/chain/api/graphql/transaction/dto/transaction.node';
import { PubSubEngine } from '@koiner/pubsub-engine';

@Resolver(() => TransactionNode)
export class TransactionCreatedSubscription {
  constructor(private readonly pubSub: PubSubEngine) {}

  @Subscription(() => TransactionNode, {
    name: 'transactionCreated',
  })
  async transactionCreated() {
    return this.pubSub.asyncIterator('transactionCreated');
  }
}
