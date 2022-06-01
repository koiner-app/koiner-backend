import { TransactionsLoader } from './dataloader';
import { TransactionResolver, TransactionsResolver } from './query';

export const TransactionGraphQLServices = [
  // DataLoaders
  TransactionsLoader,

  // Queries
  TransactionResolver,
  TransactionsResolver,
];

export * from './dataloader';
export * from './dto';
