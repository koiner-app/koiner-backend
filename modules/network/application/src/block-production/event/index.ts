import { UpdateBlockProducerOnBlockRewardCreated } from './update-block-producer-on-block-reward-created';
import { UpdateBlockProductionStatsOnBlockRewardCreated } from './update-block-production-stats-on-block-reward-created';

export const BlockProductionEventHandlers = [
  UpdateBlockProducerOnBlockRewardCreated,
  UpdateBlockProductionStatsOnBlockRewardCreated,
];
