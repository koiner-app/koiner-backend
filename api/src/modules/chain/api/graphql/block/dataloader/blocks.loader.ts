import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { Block } from '@koiner/chain/domain';
import { BlocksQuery } from '@koiner/chain/application';
import { BlockNode, BlocksRequest } from '../dto';

@Injectable({ scope: Scope.REQUEST })
export class BlocksLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(
    async (blockIds: readonly string[]) => {
      const request = new BlocksRequest();
      request.filter = {
        OR: blockIds.map((blockId) => {
          return { id: { equals: blockId } };
        }),
      };
      const selectionSet = undefined;

      const searchResponse = await this.queryBus.execute<
        BlocksQuery,
        SearchResponse<Block>
      >(new BlocksQuery(request, selectionSet));

      const blocksMap = new Map(
        searchResponse.results.map((result) => [
          result.item.id.value,
          new BlockNode(result.item),
        ]),
      );

      return blockIds.map((blockId) => blocksMap.get(blockId));
    },
  );
}
