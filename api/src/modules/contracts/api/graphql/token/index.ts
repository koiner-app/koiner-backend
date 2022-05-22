import { TokenOperationsLoader } from './dataloader';
import {
  TokenBalanceResolver,
  TokenBalancesResolver,
  TokenContractResolver,
  TokenContractsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,
  TokenContractBalancesResolver,
  TokenContractOperationsResolver,
} from './query';

export const TokenGraphQLServices = [
  // DataLoader
  TokenOperationsLoader,

  // Queries
  TokenBalanceResolver,
  TokenBalancesResolver,
  TokenContractResolver,
  TokenContractsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,

  // FieldResolvers
  TokenContractBalancesResolver,
  TokenContractOperationsResolver,
];

export * from './dataloader';
export * from './dto';
