import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { BlockProducer } from '@koiner/network/domain';
import { BlockProducersQuery } from '@koiner/network/application';
import {
  BlockProducerNode,
  BlockProducersConnection,
  BlockProducersRequest,
} from '../dto';

@Resolver(() => BlockProducerNode)
export class BlockProducersResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => BlockProducersConnection, { name: 'blockProducers' })
  async execute(
    @Args() request: BlockProducersRequest,
    @SelectionSet() selectionSet
  ): Promise<BlockProducersConnection> {
    const searchResponse = await this.queryBus.execute<
      BlockProducersQuery,
      SearchResponse<BlockProducer>
    >(
      new BlockProducersQuery(request, selectionSet, [
        'addressId',
        'contractId',
      ])
    );

    return ConnectionFactory.fromSearchResponse(
      BlockProducersConnection,
      BlockProducerNode,
      searchResponse,
      selectionSet
    );
  }
}
