import { TransactionResolver } from './queries';
import { TransactionsResolver } from './query/transactions.resolver';
import { TransactionsFieldResolver } from './query/transactions-field.resolver';

export default [
  // Mutations
  //

  // Queries
  TransactionResolver,
  TransactionsResolver,
  TransactionsFieldResolver,
];
