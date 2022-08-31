import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { BlockProducer } from '@koiner/contracts/domain';
import { BlockProducersQuery } from '@koiner/contracts/application';
import { BlockProducerNode, BlockProducersRequest } from '../dto';

@Injectable({ scope: Scope.REQUEST })
export class BlockProducersLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(async (addressIds: string[]) => {
    const request = new BlockProducersRequest();
    request.first = 1000;
    request.filter = {
      OR: addressIds.map((addressId) => {
        return { addressId: { equals: addressId } };
      }),
    };
    const selectionSet = undefined;

    const searchResponse = await this.queryBus.execute<
      BlockProducersQuery,
      SearchResponse<BlockProducer>
    >(new BlockProducersQuery(request, selectionSet));

    const blockProducersMap = new Map(
      searchResponse.results.map((result) => [
        result.item.addressId.value,
        new BlockProducerNode(result.item),
      ])
    );

    return addressIds.map((addressId) => blockProducersMap.get(addressId));
  });
}
