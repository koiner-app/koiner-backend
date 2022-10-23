import { CreateBlockRewardHandler } from './create-block-reward.handler';
import { UndoBlockRewardsHandler } from './undo-block-rewards.handler';
import { UndoBlockRewardsFromCheckpointHandler } from './undo-block-rewards-from-checkpoint.handler';
import { UpdateBlockProducerHandler } from './update-block-producer.handler';
import { UpdateBlockProductionStatsHandler } from './update-block-production-stats.handler';

export { CreateBlockRewardCommand } from './dto/create-block-reward.command';
export { UndoBlockRewardsCommand } from './dto/undo-block-rewards.command';
export { UndoBlockRewardsFromCheckpointCommand } from './dto/undo-block-rewards-from-checkpoint.command';
export { UpdateBlockProducerCommand } from './dto/update-block-producer.command';
export { UpdateBlockProductionStatsCommand } from './dto/update-block-production-stats.command';

export const BlockProductionCommandHandlers = [
  CreateBlockRewardHandler,
  UndoBlockRewardsHandler,
  UndoBlockRewardsFromCheckpointHandler,
  UpdateBlockProducerHandler,
  UpdateBlockProductionStatsHandler,
];
