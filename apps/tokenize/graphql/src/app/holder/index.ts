export * from './dto';

import {
  TokenHolderContractResolver,
  TokenHolderResolver,
  TokenHoldersResolver,
} from './query';

export const TokenHolderGraphQLServices = [
  // Queries
  TokenHolderResolver,
  TokenHoldersResolver,

  // FieldResolvers
  TokenHolderContractResolver,
];
