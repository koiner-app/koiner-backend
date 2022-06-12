import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet } from '@appvise/graphql';
import { Address } from '@koiner/chain/domain';
import { AddressesQuery } from '@koiner/chain/application';
import { AddressNode, AddressesRequest } from '../dto';

@Resolver(() => AddressNode)
export class AddressesBulkResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [AddressNode], { name: 'addressesBulk' })
  async execute(
    @SelectionSet()
    selectionSet,
    @Args('ids', { type: () => [String] })
    addressIds: string[],
    @Args('first', { type: () => Int, defaultValue: 1000 })
    first?: number
  ): Promise<AddressNode[]> {
    const request = new AddressesRequest();

    request.first = first;
    request.filter = {
      OR: addressIds.map((_addressId) => {
        return {
          id: { equals: _addressId },
        };
      }),
    };

    const searchResponse = await this.queryBus.execute<
      AddressesQuery,
      SearchResponse<Address>
    >(new AddressesQuery(request, selectionSet));

    const results: AddressNode[] = [];

    searchResponse.results.forEach((result) =>
      results.push(new AddressNode(result.item))
    );

    return results;
  }
}
