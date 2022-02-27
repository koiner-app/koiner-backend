import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/search';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';

import { Block } from '@koiner/chain/domain';
import { BlocksQuery } from '@koiner/chain/application/block/query';
import { BlocksRequest } from '../dto/blocks.request';
import { BlocksConnection } from '../dto/blocks.connection';
import { BlockNode } from '../dto/block.node';

@Resolver((of) => Block)
export class BlocksResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query((returns) => BlocksConnection, { name: 'blocks' })
  async execute(
    @Args() request: BlocksRequest,
    @SelectionSet() selectionSet,
  ): Promise<BlocksConnection> {
    const searchResponse = await this.queryBus.execute<
      BlocksQuery,
      SearchResponse<Block>
    >(new BlocksQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      BlocksConnection,
      BlockNode,
      searchResponse,
      selectionSet,
    );
  }
}
