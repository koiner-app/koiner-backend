import { EventsLoader } from './dataloader';
import { EventResolver, EventsResolver } from './query';

export const EventGraphQLServices = [
  // DataLoaders
  EventsLoader,

  // Queries
  EventResolver,
  EventsResolver,
];

export * from './dataloader';
export * from './dto';
