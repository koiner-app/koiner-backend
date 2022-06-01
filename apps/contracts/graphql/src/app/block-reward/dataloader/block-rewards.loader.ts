import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { BlockReward } from '@koiner/contracts/domain';
import { BlockRewardsQuery } from '@koiner/contracts/application';
import { BlockRewardNode, BlockRewardsRequest } from '../dto';

@Injectable({ scope: Scope.REQUEST })
export class BlockRewardsLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(async (blockHeights: string[]) => {
    const request = new BlockRewardsRequest();
    request.first = 1000;
    request.filter = {
      OR: blockHeights.map((blockHeight) => {
        return { blockHeight: { equals: parseInt(blockHeight) } };
      }),
    };
    const selectionSet = undefined;

    const searchResponse = await this.queryBus.execute<
      BlockRewardsQuery,
      SearchResponse<BlockReward>
    >(new BlockRewardsQuery(request, selectionSet));

    const blockRewardsMap = new Map(
      searchResponse.results.map((result) => [
        result.item.blockHeight.toString(),
        new BlockRewardNode(result.item),
      ]),
    );

    return blockHeights.map((blockHeight) => blockRewardsMap.get(blockHeight));
  });
}
