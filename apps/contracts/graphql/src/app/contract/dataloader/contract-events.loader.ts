import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { ContractEvent } from '@koiner/contracts/domain';
import { ContractEventsQuery } from '@koiner/contracts/application';
import { ContractEventNode, ContractEventsRequest } from '../dto';

@Injectable({ scope: Scope.REQUEST })
export class ContractEventsLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(async (eventIds: string[]) => {
    const request = new ContractEventsRequest();
    request.first = 1000;
    request.filter = {
      OR: eventIds.map((eventId) => {
        return { id: { equals: eventId } };
      }),
    };
    const selectionSet = undefined;

    const searchResponse = await this.queryBus.execute<
      ContractEventsQuery,
      SearchResponse<ContractEvent>
    >(new ContractEventsQuery(request, selectionSet));

    const eventsMap = new Map(
      searchResponse.results.map((result) => [
        result.item.id.value,
        new ContractEventNode(result.item),
      ])
    );

    return eventIds.map((eventId) => eventsMap.get(eventId));
  });
}
