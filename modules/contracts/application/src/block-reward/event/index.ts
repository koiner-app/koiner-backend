import { UpdateBlockRewardBalanceOnBlockRewardCreated } from './update-block-reward-balance-on-block-reward-created';
import { provideEventHandler } from '@koiner/nestjs-utils';

export const BlockRewardEventHandlers = [
  provideEventHandler(UpdateBlockRewardBalanceOnBlockRewardCreated),
];
