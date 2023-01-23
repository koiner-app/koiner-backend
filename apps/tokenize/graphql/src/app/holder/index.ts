export * from './dto';

import {
  KoinHoldersBulkResolver,
  TokenHolderContractResolver,
  TokenHolderResolver,
  TokenHoldersBulkResolver,
  TokenHoldersResolver,
  VhpHoldersBulkResolver,
} from './query';

export const TokenHolderGraphQLServices = [
  // Queries
  TokenHolderResolver,
  TokenHoldersResolver,

  // FieldResolvers
  KoinHoldersBulkResolver,
  TokenHolderContractResolver,
  TokenHoldersBulkResolver,
  VhpHoldersBulkResolver,
];
