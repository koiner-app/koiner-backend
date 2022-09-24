export * from './dto';

import {
  TokenEventContractResolver,
  TokenEventResolver,
  TokenEventsResolver,
} from './query';

export const TokenEventGraphQLServices = [
  // Queries
  TokenEventResolver,
  TokenEventsResolver,

  // FieldResolvers
  TokenEventContractResolver,
];
