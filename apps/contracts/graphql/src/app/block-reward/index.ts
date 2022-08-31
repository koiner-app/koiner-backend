import { BlockRewardsLoader } from './dataloader';
import {
  BlockProducerContractResolver,
  BlockProducerResolver,
  BlockProducersResolver,
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
  BlockProducerResolver,
  BlockProducersResolver,
  BlockRewardResolver,
  BlockRewardsResolver,
  BlockRewardsBulkResolver,

  // FieldResolvers
  BlockProducerContractResolver,
  BlockRewardContractsResolver,

  // Subscriptions
  BlockRewardCreatedSubscription,
  PublishBlockRewardCreatedToPubSub,
];

export * from './dataloader';
export * from './dto';
