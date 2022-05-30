import { BlockRewardCommandHandlers } from './command';
import { BlockRewardEventHandlers } from './event';
import { BlockRewardQueryHandlers } from './query';

export * from './command';
export * from './event';
export * from './query';

export const BlockRewardApplicationHandlers = [
  ...BlockRewardCommandHandlers,
  ...BlockRewardEventHandlers,
  ...BlockRewardQueryHandlers,
];
