import { EventsLoader } from './dataloader';
import { EventResolver, EventsResolver } from './query';
import { EventCreatedSubscription } from './subscription';
import { EventPubSubEventHandlers } from './pubsub';

export const EventGraphQLServices = [
  // DataLoaders
  EventsLoader,

  // Queries
  EventResolver,
  EventsResolver,

  // Subscriptions
  EventCreatedSubscription,

  // PubSub
  ...EventPubSubEventHandlers,
];

export * from './dataloader';
export * from './dto';
