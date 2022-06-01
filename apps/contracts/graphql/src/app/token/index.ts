import {
  TokenContractsLoader,
  // TODO: Fix
  //TokenOperationsLoader
} from './dataloader';
import {
  TokenBalanceContractResolver,
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
  TokenContractsLoader,
  // TODO: Fix
  // TokenOperationsLoader,

  // Queries
  TokenBalanceResolver,
  TokenBalancesResolver,
  TokenContractResolver,
  TokenContractsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,

  // FieldResolvers
  TokenBalanceContractResolver,
  TokenContractBalancesResolver,
  TokenContractOperationsResolver,
];

export * from './dataloader';
export * from './dto';
