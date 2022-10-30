import { SynchronizationCommandHandlers } from './command';
import { SynchronizationEventHandlers } from './event';
import { SynchronizationQueryHandlers } from './query';

export * from './command';
export * from './query';

export const SynchronizationApplicationHandlers = [
  ...SynchronizationCommandHandlers,
  ...SynchronizationEventHandlers,
  ...SynchronizationQueryHandlers,
];
