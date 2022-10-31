import { EventLog } from '@koiner/logger/domain';

export abstract class EventLogger {
  abstract error(
    event: { eventName: string; [key: string]: any },
    error: Error,
    itemId?: string
  ): Promise<EventLog>;
}
