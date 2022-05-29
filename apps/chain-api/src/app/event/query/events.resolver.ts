import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { Event } from '@koiner/chain/domain';
import { EventsQuery } from '@koiner/chain/application';
import { EventNode, EventsConnection, EventsRequest } from '../dto';

@Resolver(() => EventNode)
export class EventsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => EventsConnection, { name: 'events' })
  async execute(
    @Args() request: EventsRequest,
    @SelectionSet() selectionSet,
  ): Promise<EventsConnection> {
    const searchResponse = await this.queryBus.execute<
      EventsQuery,
      SearchResponse<Event>
    >(new EventsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      EventsConnection,
      EventNode,
      searchResponse,
      selectionSet,
    );
  }
}
