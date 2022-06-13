import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { BlockRewardBalanceQuery } from '@koiner/contracts/application';
import { BlockRewardBalanceNode } from '../dto';

@Resolver(() => BlockRewardBalanceNode)
export class BlockRewardBalanceResolver extends NodeQuery(
  BlockRewardBalanceNode,
  BlockRewardBalanceQuery,
  'blockRewardBalance'
) {}

export * from './block-reward-balances.resolver';
export * from './block-reward-balance-contract.resolver';
export * from './block-reward.resolver';
export * from './block-reward-contract.resolver';
export * from './block-rewards.resolver';
export * from './block-rewards-bulk.resolver';
