import { TokenEventCommandHandlers } from './command';
import { TokenEventEventHandlers } from './event';
import { TokenEventQueryHandlers } from './query';

export * from './command';
export * from './event';
export * from './query';

export const TokenEventApplicationHandlers = [
  ...TokenEventCommandHandlers,
  ...TokenEventEventHandlers,
  ...TokenEventQueryHandlers,
];
