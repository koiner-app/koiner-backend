import { SearchQuery } from '@appvise/domain';

export { BlockRewardQuery } from './dto/block-reward.query';
export class BlockRewardsQuery extends SearchQuery {}

import { BlockRewardHandler } from './block-reward.handler';
import { BlockRewardsHandler } from './block-rewards.handler';

export const BlockRewardQueryHandlers = [
  BlockRewardHandler,
  BlockRewardsHandler,
];
