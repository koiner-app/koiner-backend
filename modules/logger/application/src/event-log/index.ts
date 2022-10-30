import { EventLogCommandHandlers } from './command';
import { EventLogQueryHandlers } from './query';

export * from './command';
export * from './query';

export const EventLogApplicationHandlers = [
  ...EventLogCommandHandlers,
  ...EventLogQueryHandlers,
];
