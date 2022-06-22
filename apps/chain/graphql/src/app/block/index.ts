import { BlocksLoader } from './dataloader';
import {
  BlockResolver,
  BlocksResolver,
  BlockTransactionsResolver,
} from './query';
import {
  BlockCreatedSubscription,
  PublishBlockCreatedToPubSub,
} from './subscription';

export const BlockGraphQLServices = [
  // DataLoaders
  BlocksLoader,

  // Queries
  BlockResolver,
  BlocksResolver,
  BlockTransactionsResolver,

  // Subscriptions
  BlockCreatedSubscription,
  PublishBlockCreatedToPubSub,
];

export * from './dataloader';
export * from './dto';
