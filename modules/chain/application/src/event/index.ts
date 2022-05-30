import { EventCommandHandlers } from './command';
import { EventQueryHandlers } from './query';

export * from './command';
export * from './query';

export const EventApplicationHandlers = [
  ...EventCommandHandlers,
  ...EventQueryHandlers,
];
