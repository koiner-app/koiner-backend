import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Event, EventReadRepository } from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/domain';
import { EventsQuery } from './index';

@QueryHandler(EventsQuery)
export class EventsHandler implements IQueryHandler<EventsQuery> {
  constructor(private readonly readRepository: EventReadRepository) {}

  async execute(query: EventsQuery): Promise<SearchResponse<Event>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
