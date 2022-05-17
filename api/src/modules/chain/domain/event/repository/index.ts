import { ReadRepository, WriteRepository } from '@appvise/domain';
import { Event } from '..';

export abstract class EventReadRepository extends ReadRepository<Event> {}
export abstract class EventWriteRepository extends WriteRepository<Event> {}
