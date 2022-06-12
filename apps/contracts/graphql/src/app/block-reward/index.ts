import { BlockRewardsLoader } from './dataloader';
import {
  BlockRewardContractResolver,
  BlockRewardResolver,
  BlockRewardsBulkResolver,
  BlockRewardsResolver,
} from './query';

export const BlockRewardGraphQLServices = [
  // DataLoader
  BlockRewardsLoader,

  // Queries
  BlockRewardResolver,
  BlockRewardsResolver,
  BlockRewardsBulkResolver,

  // FieldResolvers
  BlockRewardContractResolver,
];

export * from './dataloader';
export * from './dto';
