import { BlockResolver } from './query/block.resolver';
import { BlocksResolver } from './query/blocks.resolver';
import { BlockTransactionsResolver } from './query/block-transactions.resolver';
import { BlockCreatedSubscription } from './subscription/block-created.subscription';
import BlockPubSubEventHandlers from './pubsub';

export default [
  // Mutations
  //

  // Queries
  BlockResolver,
  BlocksResolver,
  BlockTransactionsResolver,

  // Subscriptions
  BlockCreatedSubscription,

  // PubSub
  ...BlockPubSubEventHandlers,
];
