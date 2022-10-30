import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { EventLog } from '@koiner/logger/domain';
import { EventLogsQuery } from '@koiner/logger/application';
import { EventLogNode, EventLogsConnection, EventLogsRequest } from '../dto';

@Resolver(() => EventLogNode)
export class EventLogsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => EventLogsConnection, { name: 'eventLogs' })
  async execute(
    @Args() request: EventLogsRequest,
    @SelectionSet() selectionSet: any
  ): Promise<EventLogsConnection> {
    const searchResponse = await this.queryBus.execute<
      EventLogsQuery,
      SearchResponse<EventLog>
    >(new EventLogsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      EventLogsConnection,
      EventLogNode,
      searchResponse,
      selectionSet
    );
  }
}
