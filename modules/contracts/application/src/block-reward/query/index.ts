import { ItemQuery, SearchQuery } from '@appvise/domain';

export { BlockRewardQuery } from './dto/block-reward.query';
export class BlockRewardsQuery extends SearchQuery {}
export class BlockProducerQuery extends ItemQuery {}
export class BlockProducersQuery extends SearchQuery {}

import { BlockRewardHandler } from './block-reward.handler';
import { BlockRewardsHandler } from './block-rewards.handler';
import { BlockProducerHandler } from './block-producer.handler';
import { BlockProducersHandler } from './block-producers.handler';

export const BlockRewardQueryHandlers = [
  BlockRewardHandler,
  BlockRewardsHandler,
  BlockProducerHandler,
  BlockProducersHandler,
];
