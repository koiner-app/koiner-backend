import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  BlockProductionStats,
  BlockProductionStatsReadRepository,
} from '@koiner/network/domain';
import { BlockProductionStatsQuery } from '.';

@QueryHandler(BlockProductionStatsQuery)
export class BlockProductionStatsHandler
  implements IQueryHandler<BlockProductionStatsQuery>
{
  constructor(
    private readonly readRepository: BlockProductionStatsReadRepository
  ) {}

  async execute(
    query: BlockProductionStatsQuery
  ): Promise<BlockProductionStats> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
