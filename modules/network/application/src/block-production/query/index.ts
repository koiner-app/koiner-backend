import { ItemQuery, SearchQuery } from '@appvise/domain';

export { BlockRewardQuery } from './dto/block-reward.query';
export class BlockRewardsQuery extends SearchQuery {}
export class BlockProducerQuery extends ItemQuery {}
export class BlockProducersQuery extends SearchQuery {}
export class BlockProductionStatsQuery extends ItemQuery {}
export { BlockProductionStatsByContractIdQuery } from './dto/block-production-stats-by-contract-id.query';

import { BlockRewardHandler } from './block-reward.handler';
import { BlockRewardsHandler } from './block-rewards.handler';
import { BlockProducerHandler } from './block-producer.handler';
import { BlockProducersHandler } from './block-producers.handler';
import { BlockProductionStatsHandler } from './block-production-stats.handler';
import { BlockProductionStatsByContractIdHandler } from './block-production-stats-by-contract-id.handler';

export const BlockProductionQueryHandlers = [
  BlockRewardHandler,
  BlockRewardsHandler,
  BlockProducerHandler,
  BlockProducersHandler,
  BlockProductionStatsHandler,
  BlockProductionStatsByContractIdHandler,
];
