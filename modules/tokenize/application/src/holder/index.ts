import { TokenHolderCommandHandlers } from './command';
import { TokenHolderEventHandlers } from './event';
import { TokenHolderQueryHandlers } from './query';

export * from './command';
export * from './event';
export * from './query';

export const TokenHolderApplicationHandlers = [
  ...TokenHolderCommandHandlers,
  ...TokenHolderEventHandlers,
  ...TokenHolderQueryHandlers,
];
