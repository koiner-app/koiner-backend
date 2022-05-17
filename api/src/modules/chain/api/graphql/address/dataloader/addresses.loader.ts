import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { Address } from '@koiner/chain/domain';
import { AddressesQuery } from '@koiner/chain/application';
import { AddressNode, AddressesRequest } from '../dto';

@Injectable({ scope: Scope.REQUEST })
export class AddressesLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(
    async (addressIds: readonly string[]) => {
      const request = new AddressesRequest();
      request.filter = {
        OR: addressIds.map((addressId) => {
          return { id: { equals: addressId } };
        }),
      };
      const selectionSet = undefined;

      const searchResponse = await this.queryBus.execute<
        AddressesQuery,
        SearchResponse<Address>
      >(new AddressesQuery(request, selectionSet));

      const addressesMap = new Map(
        searchResponse.results.map((result) => [
          result.item.id.value,
          new AddressNode(result.item),
        ]),
      );

      return addressIds.map((addressId) => addressesMap.get(addressId));
    },
  );
}
