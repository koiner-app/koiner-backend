import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BlockReward, BlockRewardReadRepository } from '@koiner/network/domain';
import { SearchResponse } from '@appvise/domain';
import { BlockRewardsQuery } from '.';

@QueryHandler(BlockRewardsQuery)
export class BlockRewardsHandler implements IQueryHandler<BlockRewardsQuery> {
  constructor(private readonly readRepository: BlockRewardReadRepository) {}

  async execute(
    query: BlockRewardsQuery
  ): Promise<SearchResponse<BlockReward>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
