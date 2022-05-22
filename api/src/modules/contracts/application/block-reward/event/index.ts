import { UpdateBlockRewardBalanceOnBlockRewardCreated } from './update-block-reward-balance-on-block-reward-created';
import { provideEventHandler } from '@appvise/nestjs-utils';

export const BlockRewardEventHandlers = [
  provideEventHandler(UpdateBlockRewardBalanceOnBlockRewardCreated),
];
