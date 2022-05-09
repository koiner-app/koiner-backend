import { TransactionResolver } from './queries';
import { TransactionsResolver } from './query/transactions.resolver';
import { TransactionCreatedSubscription } from './subscription/transaction-created.subscription';
import TransactionPubSubEventHandlers from './pubsub';

export default [
  // Mutations
  //

  // Queries
  TransactionResolver,
  TransactionsResolver,

  // Subscriptions
  TransactionCreatedSubscription,

  // PubSub
  ...TransactionPubSubEventHandlers,
];
