import { Resolver, Subscription } from '@nestjs/graphql';
import { OperationNode } from '@koiner/chain/api/graphql/operation/dto/operation.node';
import { PubSubEngine } from '@koiner/pubsub-engine';

@Resolver(() => OperationNode)
export class OperationCreatedSubscription {
  constructor(private readonly pubSub: PubSubEngine) {}

  @Subscription(() => OperationNode, {
    name: 'operationCreated',
  })
  async operationCreated() {
    return this.pubSub.asyncIterator('operationCreated');
  }
}
