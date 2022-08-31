import {
  TokenContractsLoader,
  // TODO: Fix
  //TokenOperationsLoader
} from './dataloader';
import {
  TokenHolderContractResolver,
  TokenHolderResolver,
  TokenHoldersResolver,
  TokenContractResolver,
  TokenContractsResolver,
  TokenContractHoldersResolver,
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
  TokenHolderResolver,
  TokenHoldersResolver,
  TokenContractResolver,
  TokenContractsResolver,
  TokenEventResolver,
  TokenEventsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,

  // FieldResolvers
  TokenHolderContractResolver,
  TokenContractHoldersResolver,
  TokenContractOperationsResolver,
  TokenEventContractResolver,
  TokenEventContractEventResolver,
  TokenOperationContractResolver,
];

export * from './dataloader';
export * from './dto';
