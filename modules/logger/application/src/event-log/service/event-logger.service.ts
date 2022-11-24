import { SortDirection } from '@appvise/domain';
import {
  EventLog,
  EventLogger,
  EventLogReadRepository,
  EventLogWriteRepository,
} from '@koiner/logger/domain';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EventLoggerService extends EventLogger {
  constructor(
    private readonly readRepository: EventLogReadRepository,
    private readonly writeRepository: EventLogWriteRepository
  ) {
    super();
  }

  async error(
    event: { id: string; eventName: string; [key: string]: any },
    error: Error,
    itemId?: string
  ): Promise<EventLog> {
    const eventLog = EventLog.create({
      eventName: 'error',
      data: {
        event: event.toString(),
        error: JSON.stringify(error, Object.getOwnPropertyNames(error)),
      },
      itemId: itemId ?? event.id,
      itemType: event.eventName,
      timestamp: Date.now(),
    });

    // Check if error is occurring another time to prevent the logs from getting bloated
    const latestEventLogs = await this.readRepository.find({
      first: 1,
      sort: [{ field: 'timestamp', direction: SortDirection.desc }],
    });

    let latestEventLog: EventLog | undefined;
    if (latestEventLogs.results.length === 1) {
      latestEventLog = latestEventLogs.results[0].item;

      if (latestEventLog.equals(eventLog)) {
        // New occurrence of last log: add to counter and return last log
        latestEventLog.addToCount();

        await this.writeRepository.save(latestEventLog);

        return latestEventLog;
      }
    }

    // Event hasn't occurred yet. Create new event log
    await this.writeRepository.save(eventLog);

    return eventLog;
  }
}
