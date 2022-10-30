import { ItemQuery, SearchQuery } from '@appvise/domain';

export class EventLogQuery extends ItemQuery {}
export class EventLogsQuery extends SearchQuery {}

import { EventLogHandler } from './event-log.handler';
import { EventLogsHandler } from './event-logs.handler';

export const EventLogQueryHandlers = [EventLogHandler, EventLogsHandler];
