import { ItemQuery, SearchQuery } from '@appvise/domain';

export { BlockRewardQuery } from './dto/block-reward.query';
export class BlockRewardsQuery extends SearchQuery {}
export class BlockRewardBalanceQuery extends ItemQuery {}
export class BlockRewardBalancesQuery extends SearchQuery {}

import { BlockRewardHandler } from './block-reward.handler';
import { BlockRewardsHandler } from './block-rewards.handler';
import { BlockRewardBalanceHandler } from './block-reward-balance.handler';
import { BlockRewardBalancesHandler } from './block-reward-balances.handler';

export const BlockRewardQueryHandlers = [
  BlockRewardHandler,
  BlockRewardsHandler,
  BlockRewardBalanceHandler,
  BlockRewardBalancesHandler,
];
