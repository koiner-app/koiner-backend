import { BlockCommandHandlers } from './command';
import { BlockQueryHandlers } from './query';

export * from './command';
export * from './query';

export const BlockApplicationHandlers = [
  ...BlockCommandHandlers,
  ...BlockQueryHandlers,
];
