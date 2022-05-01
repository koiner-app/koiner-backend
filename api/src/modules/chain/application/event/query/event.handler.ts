import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Event, EventReadRepository } from '@koiner/chain/domain';
import { EventQuery } from './index';

@QueryHandler(EventQuery)
export class EventHandler implements IQueryHandler<EventQuery> {
  constructor(private readonly readRepository: EventReadRepository) {}

  async execute(query: EventQuery): Promise<Event> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
