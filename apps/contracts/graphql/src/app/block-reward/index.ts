import { BlockRewardsLoader } from './dataloader';
import {
  BlockRewardBalanceContractResolver,
  BlockRewardBalanceResolver,
  BlockRewardBalancesResolver,
  BlockRewardContractResolver,
  BlockRewardResolver,
  BlockRewardsBulkResolver,
  BlockRewardsResolver,
} from './query';

export const BlockRewardGraphQLServices = [
  // DataLoader
  BlockRewardsLoader,

  // Queries
  BlockRewardBalanceResolver,
  BlockRewardBalancesResolver,
  BlockRewardResolver,
  BlockRewardsResolver,
  BlockRewardsBulkResolver,

  // FieldResolvers
  BlockRewardBalanceContractResolver,
  BlockRewardContractResolver,
];

export * from './dataloader';
export * from './dto';
