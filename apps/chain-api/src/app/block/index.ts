import { BlocksLoader } from './dataloader';
import {
  BlockResolver,
  BlocksResolver,
  BlockTransactionsResolver,
} from './query';

export const BlockGraphQLServices = [
  // DataLoaders
  BlocksLoader,

  // Queries
  BlockResolver,
  BlocksResolver,
  BlockTransactionsResolver,
];

export * from './dataloader';
export * from './dto';
