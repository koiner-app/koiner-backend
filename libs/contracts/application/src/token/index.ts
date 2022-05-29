import { TokenCommandHandlers } from './command';
import { TokenEventHandlers } from './event';
import { TokenQueryHandlers } from './query';

export * from './command';
export * from './event';
export * from './query';

export const TokenApplicationHandlers = [
  ...TokenCommandHandlers,
  ...TokenEventHandlers,
  ...TokenQueryHandlers,
];
