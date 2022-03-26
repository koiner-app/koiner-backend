import { TransactionResolver } from './queries';
import { TransactionsResolver } from './query/transactions.resolver';

export default [
  // Mutations
  //

  // Queries
  TransactionResolver,
  TransactionsResolver,
];
