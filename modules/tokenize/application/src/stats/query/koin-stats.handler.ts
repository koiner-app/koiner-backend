import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { KoinStats, KoinStatsReadRepository } from '@koiner/tokenize/domain';
import { KoinStatsQuery } from '.';

@QueryHandler(KoinStatsQuery)
export class KoinStatsHandler implements IQueryHandler<KoinStatsQuery> {
  constructor(private readonly readRepository: KoinStatsReadRepository) {}

  async execute(query: KoinStatsQuery): Promise<KoinStats> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
