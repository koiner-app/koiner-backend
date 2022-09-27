import { SyncBlockRewardHandler } from './sync-block-reward.handler';
import { SyncBlockRewardsHandler } from './sync-block-rewards.handler';

export { SyncBlockRewardCommand } from './dto/sync-block-reward.command';
export { SyncBlockRewardsCommand } from './dto/sync-block-rewards.command';

export const NetworkSyncCommandHandlers = [
  SyncBlockRewardHandler,
  SyncBlockRewardsHandler,
];
