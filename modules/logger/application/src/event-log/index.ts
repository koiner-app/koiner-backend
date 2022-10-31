import { EventLogCommandHandlers } from './command';
import { EventLogQueryHandlers } from './query';
import { EventLogApplicationServices } from './service';

export * from './command';
export * from './query';

export const EventLogApplicationHandlers = [
  ...EventLogCommandHandlers,
  ...EventLogQueryHandlers,
  ...EventLogApplicationServices,
];
