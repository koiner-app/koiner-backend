import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet } from '@appvise/graphql';
import { BlockReward } from '@koiner/contracts/domain';
import { BlockRewardsQuery } from '@koiner/contracts/application';
import { BlockRewardNode, BlockRewardsRequest } from '../dto';

@Resolver(() => BlockRewardNode)
export class BlockRewardsBulkResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [BlockRewardNode], { name: 'blockRewardsBulk' })
  async execute(
    @SelectionSet()
    selectionSet,
    @Args('heights', { type: () => [Int], nullable: true })
    heights?: number[],
    @Args('producerIds', { type: () => [String], nullable: true })
    producerIds?: string[],
    @Args('first', { type: () => Int, defaultValue: 1000 })
    first?: number
  ): Promise<BlockRewardNode[]> {
    const request = new BlockRewardsRequest();
    request.first = first;

    if (heights) {
      request.filter = {
        OR: heights.map((_blockHeight) => {
          return {
            blockHeight: { equals: _blockHeight },
          };
        }),
      };
    }

    if (producerIds) {
      request.filter = {
        OR: producerIds.map((_producerId) => {
          return {
            producerId: { equals: _producerId },
          };
        }),
      };
    }

    const searchResponse = await this.queryBus.execute<
      BlockRewardsQuery,
      SearchResponse<BlockReward>
    >(new BlockRewardsQuery(request, selectionSet));

    const results: BlockRewardNode[] = [];

    searchResponse.results.forEach((result) =>
      results.push(new BlockRewardNode(result.item))
    );

    return results;
  }
}
