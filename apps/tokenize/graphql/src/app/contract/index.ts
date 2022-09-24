export * from './dataloader';
export * from './dto';

import { TokenContractsLoader } from './dataloader';
import {
  TokenContractResolver,
  TokenContractsResolver,
  TokenContractHoldersResolver,
  TokenContractOperationsResolver,
} from './query';

export const TokenContractGraphQLServices = [
  // DataLoader
  TokenContractsLoader,

  // Queries
  TokenContractResolver,
  TokenContractsResolver,

  // FieldResolvers
  TokenContractHoldersResolver,
  TokenContractOperationsResolver,
];
