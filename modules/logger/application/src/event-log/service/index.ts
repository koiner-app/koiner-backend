import { EventLogger } from '@koiner/logger/domain';
import { EventLoggerService } from './event-logger.service';

export const EventLogApplicationServices = [
  {
    provide: EventLogger,
    useClass: EventLoggerService,
  },
];
