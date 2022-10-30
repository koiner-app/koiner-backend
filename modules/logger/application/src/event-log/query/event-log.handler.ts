import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EventLog, EventLogReadRepository } from '@koiner/logger/domain';
import { EventLogQuery } from '.';

@QueryHandler(EventLogQuery)
export class EventLogHandler implements IQueryHandler<EventLogQuery> {
  constructor(private readonly readRepository: EventLogReadRepository) {}

  async execute(query: EventLogQuery): Promise<EventLog> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
