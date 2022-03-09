import { TransactionResolver } from './queries';
import { TransactionsResolver } from './query/transactions.resolver';
import { OperationDetailsResolver } from '@koiner/chain/api/graphql/transaction/query/operation-details.resolver';

export default [
  // Mutations
  //

  // Queries
  TransactionResolver,
  TransactionsResolver,
  OperationDetailsResolver,
];

// Must be exported for the enum to be registered in GraphQL schema
export * from './dto/operation-type.enum';
