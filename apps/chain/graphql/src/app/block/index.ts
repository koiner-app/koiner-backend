import { BlocksLoader } from './dataloader';
import {
  BlockEventsResolver,
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
  BlockEventsResolver,
  BlockTransactionsResolver,

  // Subscriptions
  BlockCreatedSubscription,
  PublishBlockCreatedToPubSub,
];

export * from './dataloader';
export * from './dto';
