import { CreateBlockRewardHandler } from './create-block-reward.handler';
import { UpdateBlockRewardBalanceHandler } from './update-block-reward-balance.handler';

export { CreateBlockRewardCommand } from './dto/create-block-reward.command';
export { UpdateBlockRewardBalanceCommand } from './dto/update-block-reward-balance.command';

export const BlockRewardCommandHandlers = [
  CreateBlockRewardHandler,
  UpdateBlockRewardBalanceHandler,
];
