import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  Synchronization,
  SynchronizationReadRepository,
} from '@koiner/sync/domain';
import { SearchResponse } from '@appvise/domain';
import { SynchronizationsQuery } from '.';

@QueryHandler(SynchronizationsQuery)
export class SynchronizationsHandler
  implements IQueryHandler<SynchronizationsQuery>
{
  constructor(private readonly readRepository: SynchronizationReadRepository) {}

  async execute(
    query: SynchronizationsQuery
  ): Promise<SearchResponse<Synchronization>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
