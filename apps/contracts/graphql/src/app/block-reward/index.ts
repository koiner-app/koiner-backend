import { BlockProducersLoader, BlockRewardsLoader } from './dataloader';
import {
  BlockProducerContractResolver,
  BlockProducerResolver,
  BlockProducersResolver,
  BlockRewardContractsResolver,
  BlockRewardProducerResolver,
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
  BlockProducersLoader,
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
  BlockRewardProducerResolver,

  // Subscriptions
  BlockRewardCreatedSubscription,
  PublishBlockRewardCreatedToPubSub,
];

export * from './dataloader';
export * from './dto';
