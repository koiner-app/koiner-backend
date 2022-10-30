import { CreateEventLogHandler } from './create-event-log.handler';

export { CreateEventLogCommand } from './dto/create-event-log.command';

export const EventLogCommandHandlers = [CreateEventLogHandler];
