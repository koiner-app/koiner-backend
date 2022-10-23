import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  BlockProductionStats,
  BlockProductionStatsReadRepository,
} from '@koiner/network/domain';
import { BlockProductionStatsByContractIdQuery } from '.';

@QueryHandler(BlockProductionStatsByContractIdQuery)
export class BlockProductionStatsByContractIdHandler
  implements IQueryHandler<BlockProductionStatsByContractIdQuery>
{
  constructor(
    private readonly readRepository: BlockProductionStatsReadRepository
  ) {}

  async execute(
    query: BlockProductionStatsByContractIdQuery
  ): Promise<BlockProductionStats> {
    return this.readRepository.findOneByContractIdOrThrow(
      query.contractId,
      query.selectionSet
    );
  }
}
