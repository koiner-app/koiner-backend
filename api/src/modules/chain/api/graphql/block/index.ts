import { BlocksLoader } from './dataloader';
import {
  BlockResolver,
  BlocksResolver,
  BlockTransactionsResolver,
} from './query';
import { BlockCreatedSubscription } from './subscription';
import { BlockPubSubEventHandlers } from './pubsub';

export const BlockGraphQLServices = [
  // DataLoaders
  BlocksLoader,

  // Queries
  BlockResolver,
  BlocksResolver,
  BlockTransactionsResolver,

  // Subscriptions
  BlockCreatedSubscription,

  // PubSub
  ...BlockPubSubEventHandlers,
];

export * from './dataloader';
export * from './dto';
