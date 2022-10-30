import { ReadRepository, WriteRepository } from '@appvise/domain';
import { EventLog } from '../event-log';

export abstract class EventLogReadRepository extends ReadRepository<EventLog> {}
export abstract class EventLogWriteRepository extends WriteRepository<EventLog> {}
