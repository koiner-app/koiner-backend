import { TokenOperationsLoader } from './dataloader';
import {
  TokenContractResolver,
  TokenContractsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,
  TokenContractOperationsResolver,
} from './query';

export const TokenGraphQLServices = [
  // DataLoader
  TokenOperationsLoader,

  // Queries
  TokenContractResolver,
  TokenContractsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,

  // FieldResolvers
  TokenContractOperationsResolver,
];

export * from './dataloader';
export * from './dto';
