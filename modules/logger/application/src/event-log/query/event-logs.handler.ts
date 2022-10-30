import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { EventLog, EventLogReadRepository } from '@koiner/logger/domain';
import { SearchResponse } from '@appvise/domain';
import { EventLogsQuery } from '.';

@QueryHandler(EventLogsQuery)
export class EventLogsHandler implements IQueryHandler<EventLogsQuery> {
  constructor(private readonly readRepository: EventLogReadRepository) {}

  async execute(query: EventLogsQuery): Promise<SearchResponse<EventLog>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
