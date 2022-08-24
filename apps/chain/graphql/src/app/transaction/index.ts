import { TransactionsLoader } from './dataloader';
import {
  TransactionEventsResolver,
  TransactionResolver,
  TransactionsResolver,
} from './query';

export const TransactionGraphQLServices = [
  // DataLoaders
  TransactionsLoader,

  // Queries
  TransactionResolver,
  TransactionsResolver,
  TransactionEventsResolver,
];

export * from './dataloader';
export * from './dto';
