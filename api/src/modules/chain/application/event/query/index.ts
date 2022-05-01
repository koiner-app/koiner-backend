import { ItemQuery, SearchQuery } from '@appvise/domain';

export class EventQuery extends ItemQuery {}
export class EventsQuery extends SearchQuery {}

import { EventHandler } from './event.handler';
import { EventsHandler } from './events.handler';

export default {
  handlers: [EventHandler, EventsHandler],
};
