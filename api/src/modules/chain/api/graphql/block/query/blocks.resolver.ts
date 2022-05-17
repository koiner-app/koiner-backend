import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { Block } from '@koiner/chain/domain';
import { BlocksQuery } from '@koiner/chain/application';
import { BlockNode, BlocksConnection, BlocksRequest } from '../dto';

@Resolver(() => BlockNode)
export class BlocksResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => BlocksConnection, { name: 'blocks' })
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
