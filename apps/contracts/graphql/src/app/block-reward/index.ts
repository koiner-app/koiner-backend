import { BlockRewardsLoader } from './dataloader';
import { BlockRewardResolver, BlockRewardsResolver } from './query';

export const BlockRewardGraphQLServices = [
  // DataLoader
  BlockRewardsLoader,

  // Queries
  BlockRewardResolver,
  BlockRewardsResolver,
];

export * from './dataloader';
export * from './dto';
