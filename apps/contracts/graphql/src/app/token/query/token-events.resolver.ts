import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { TokenEvent } from '@koiner/contracts/domain';
import { TokenEventsQuery } from '@koiner/contracts/application';
import {
  TokenEventNode,
  TokenEventsConnection,
  TokenEventsRequest,
} from '../dto';

@Resolver(() => TokenEventNode)
export class TokenEventsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => TokenEventsConnection, { name: 'tokenEvents' })
  async execute(
    @Args() request: TokenEventsRequest,
    @SelectionSet() selectionSet
  ): Promise<TokenEventsConnection> {
    const searchResponse = await this.queryBus.execute<
      TokenEventsQuery,
      SearchResponse<TokenEvent>
    >(
      new TokenEventsQuery(request, selectionSet, [
        'id',
        'contractId',
        'name',
        'from',
        'to',
      ])
    );

    return ConnectionFactory.fromSearchResponse(
      TokenEventsConnection,
      TokenEventNode,
      searchResponse,
      selectionSet
    );
  }
}
