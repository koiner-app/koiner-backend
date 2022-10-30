// Dto exports must be before resolvers
export * from './dto';

import { EventLogResolver, EventLogsResolver } from './query';

export const EventLogGraphQLServices = [
  // Queries
  EventLogResolver,
  EventLogsResolver,
];
