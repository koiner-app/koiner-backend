import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet } from '@appvise/graphql';
import { BlockReward } from '@koiner/network/domain';
import { BlockRewardsQuery } from '@koiner/network/application';
import {
  BlockRewardBulkResult,
  BlockRewardNode,
  BlockRewardsRequest,
} from '../dto';

@Resolver(() => BlockRewardBulkResult)
export class BlockRewardsBulkResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [BlockRewardBulkResult], { name: 'blockRewardsBulk' })
  async execute(
    @SelectionSet()
    selectionSet,
    @Args('heights', { type: () => [Int], nullable: true })
    heights?: number[],
    @Args('first', { type: () => Int, defaultValue: 1000 })
    first?: number
  ): Promise<BlockRewardBulkResult[]> {
    const request = new BlockRewardsRequest();
    request.first = first;

    request.filter = {
      OR: heights.map((_blockHeight) => {
        return {
          blockHeight: { equals: _blockHeight },
        };
      }),
    };

    const searchResponse = await this.queryBus.execute<
      BlockRewardsQuery,
      SearchResponse<BlockReward>
    >(new BlockRewardsQuery(request, selectionSet));

    const results: BlockRewardBulkResult[] = [];

    heights.forEach((height) => {
      const result = searchResponse.results.find(
        (_result) => _result.item.blockHeight.toString() === height.toString()
      );

      results.push(
        new BlockRewardBulkResult(
          result ? new BlockRewardNode(result.item) : undefined
        )
      );
    });

    return results;
  }
}
