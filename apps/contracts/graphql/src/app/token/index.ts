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
  TokenContractBalancesResolver,
  TokenContractOperationsResolver,
  TokenEventContractResolver,
  TokenEventResolver,
  TokenEventsResolver,
  TokenEventContractEventResolver,
  TokenOperationResolver,
  TokenOperationsResolver,
  TokenOperationContractResolver,
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
  TokenEventResolver,
  TokenEventsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,

  // FieldResolvers
  TokenBalanceContractResolver,
  TokenContractBalancesResolver,
  TokenContractOperationsResolver,
  TokenEventContractResolver,
  TokenEventContractEventResolver,
  TokenOperationContractResolver,
];

export * from './dataloader';
export * from './dto';
