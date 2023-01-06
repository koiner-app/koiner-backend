import { TransactionsLoader } from './dataloader';
import {
  TransactionEventsResolver,
  TransactionResolver,
  TransactionsBulkResolver,
  TransactionsResolver,
} from './query';

export const TransactionGraphQLServices = [
  // DataLoaders
  TransactionsLoader,

  // Queries
  TransactionResolver,
  TransactionsResolver,
  TransactionsBulkResolver,
  TransactionEventsResolver,
];

export * from './dataloader';
export * from './dto';
