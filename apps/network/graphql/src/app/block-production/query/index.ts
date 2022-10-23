import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { BlockProducerQuery } from '@koiner/network/application';
import { BlockProducerNode } from '../dto';

@Resolver(() => BlockProducerNode)
export class BlockProducerResolver extends NodeQuery(
  BlockProducerNode,
  BlockProducerQuery,
  'blockProducer'
) {}

export * from './block-reward.resolver';
export * from './block-reward-producer.resolver';
export * from './block-rewards.resolver';
export * from './block-rewards-bulk.resolver';
export * from './block-producers.resolver';
export * from './block-production-stats.resolver';
