import { BlockRewardsLoader, TokenOperationsLoader } from './dataloader';
import {
  BlockRewardResolver,
  BlockRewardsResolver,
  TokenContractResolver,
  TokenContractsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,
  TokenContractOperationsResolver,
} from './query';

export const TokenGraphQLServices = [
  // DataLoader
  BlockRewardsLoader,
  TokenOperationsLoader,

  // Queries
  BlockRewardResolver,
  BlockRewardsResolver,
  TokenContractResolver,
  TokenContractsResolver,
  TokenOperationResolver,
  TokenOperationsResolver,

  // FieldResolvers
  TokenContractOperationsResolver,
];

export * from './dataloader';
export * from './dto';
