import { UpdateBlockProducerOnBlockRewardCreated } from './update-block-producer-on-block-reward-created';
import { UpdateBlockProductionStatsOnBlockRewardReceived } from './update-block-production-stats-on-block-reward-received';

export const BlockProductionEventHandlers = [
  UpdateBlockProducerOnBlockRewardCreated,
  UpdateBlockProductionStatsOnBlockRewardReceived,
];
