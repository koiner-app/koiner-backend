import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  BlockRewardBalance,
  BlockRewardBalanceReadRepository,
} from '@koiner/contracts/domain';
import { SearchResponse } from '@appvise/domain';
import { BlockRewardBalancesQuery } from '.';

@QueryHandler(BlockRewardBalancesQuery)
export class BlockRewardBalancesHandler
  implements IQueryHandler<BlockRewardBalancesQuery>
{
  constructor(
    private readonly readRepository: BlockRewardBalanceReadRepository
  ) {}

  async execute(
    query: BlockRewardBalancesQuery
  ): Promise<SearchResponse<BlockRewardBalance>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
