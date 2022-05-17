import { TransactionsLoader } from './dataloader';
import { TransactionResolver, TransactionsResolver } from './query';
import { TransactionCreatedSubscription } from './subscription';
import { TransactionPubSubEventHandlers } from './pubsub';

export const TransactionGraphQLServices = [
  // DataLoaders
  TransactionsLoader,

  // Queries
  TransactionResolver,
  TransactionsResolver,

  // Subscriptions
  TransactionCreatedSubscription,

  // PubSub
  ...TransactionPubSubEventHandlers,
];

export * from './dataloader';
export * from './dto';
