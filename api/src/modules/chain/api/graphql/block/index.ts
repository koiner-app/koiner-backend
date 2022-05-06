import { BlockResolver } from './query/block.resolver';
import { BlocksResolver } from './query/blocks.resolver';
import { BlockTransactionsResolver } from './query/block-transactions.resolver';
import { BlockCreatedSubscription } from './subscription/block-created.subscription';

export default [
  // Mutations
  //

  // Queries
  BlockResolver,
  BlocksResolver,
  BlockTransactionsResolver,

  // Subscriptions
  BlockCreatedSubscription,
];
