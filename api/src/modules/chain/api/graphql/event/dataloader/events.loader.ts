import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { Event } from '@koiner/chain/domain';
import { EventsQuery } from '@koiner/chain/application';
import { EventNode, EventsRequest } from '../dto';

@Injectable({ scope: Scope.REQUEST })
export class EventsLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(
    async (eventIds: readonly string[]) => {
      const request = new EventsRequest();
      request.filter = {
        OR: eventIds.map((eventId) => {
          return { id: { equals: eventId } };
        }),
      };
      const selectionSet = undefined;

      const searchResponse = await this.queryBus.execute<
        EventsQuery,
        SearchResponse<Event>
      >(new EventsQuery(request, selectionSet));

      const eventsMap = new Map(
        searchResponse.results.map((result) => [
          result.item.id.value,
          new EventNode(result.item),
        ]),
      );

      return eventIds.map((eventId) => eventsMap.get(eventId));
    },
  );
}
