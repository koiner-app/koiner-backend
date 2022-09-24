export * from './dto';

import {
  TokenOperationResolver,
  TokenOperationsResolver,
  TokenOperationContractResolver,
} from './query';

export const TokenOperationGraphQLServices = [
  // Queries
  TokenOperationResolver,
  TokenOperationsResolver,

  // FieldResolvers
  TokenOperationContractResolver,
];
