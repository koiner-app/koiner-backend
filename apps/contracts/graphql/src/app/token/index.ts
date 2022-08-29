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
  TokenEventContractResolver,
  TokenEventResolver,
  TokenEventsResolver,
  TokenEventContractEventResolver,
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
];

export * from './dataloader';
export * from './dto';
