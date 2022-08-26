import { BlockRewardsLoader } from './dataloader';
import {
  BlockRewardBalanceContractResolver,
  BlockRewardBalanceResolver,
  BlockRewardBalancesResolver,
  BlockRewardContractsResolver,
  BlockRewardResolver,
  BlockRewardsBulkResolver,
  BlockRewardsResolver,
} from './query';
import {
  BlockRewardCreatedSubscription,
  PublishBlockRewardCreatedToPubSub,
} from './subscription';

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
  BlockRewardContractsResolver,

  // Subscriptions
  BlockRewardCreatedSubscription,
  PublishBlockRewardCreatedToPubSub,
];

export * from './dataloader';
export * from './dto';
