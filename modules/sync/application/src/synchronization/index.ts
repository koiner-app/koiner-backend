import { SynchronizationCommandHandlers } from './command';
import { SynchronizationQueryHandlers } from './query';

export * from './command';
export * from './query';

export const SynchronizationApplicationHandlers = [
  ...SynchronizationCommandHandlers,
  ...SynchronizationQueryHandlers,
];
