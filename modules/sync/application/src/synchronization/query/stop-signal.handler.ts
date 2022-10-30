import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { StopSignal, StopSignalReadRepository } from '@koiner/sync/domain';
import { StopSignalQuery } from '.';

@QueryHandler(StopSignalQuery)
export class StopSignalHandler implements IQueryHandler<StopSignalQuery> {
  constructor(private readonly readRepository: StopSignalReadRepository) {}

  async execute(query: StopSignalQuery): Promise<StopSignal> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
