import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  Synchronization,
  SynchronizationReadRepository,
} from '@koiner/sync/domain';
import { SynchronizationQuery } from '.';

@QueryHandler(SynchronizationQuery)
export class SynchronizationHandler
  implements IQueryHandler<SynchronizationQuery>
{
  constructor(private readonly readRepository: SynchronizationReadRepository) {}

  async execute(query: SynchronizationQuery): Promise<Synchronization> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
