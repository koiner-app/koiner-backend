import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet } from '@appvise/graphql';
import { TokenHolder } from '@koiner/tokenize/domain';
import { TokenHoldersQuery } from '@koiner/tokenize/application';
import { TokenHolderNode, TokenHoldersRequest } from '../dto';

@Resolver(() => TokenHolderNode)
export class TokenHoldersBulkResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [TokenHolderNode], { name: 'tokenHoldersBulk' })
  async execute(
    @SelectionSet()
    selectionSet,
    @Args('ids', { type: () => [String] })
    addressIds: string[],
    @Args('contractId')
    contractId: string,
    @Args('first', { type: () => Int, defaultValue: 1000 })
    first?: number
  ): Promise<TokenHolderNode[]> {
    const request = new TokenHoldersRequest();

    request.first = first;
    request.filter = {
      OR: addressIds.map((_addressId) => {
        return {
          addressId: { equals: _addressId },
        };
      }),
      contractId: {
        equals: contractId,
      },
    };

    const searchResponse = await this.queryBus.execute<
      TokenHoldersQuery,
      SearchResponse<TokenHolder>
    >(new TokenHoldersQuery(request, selectionSet));

    // Results must be returned in exactly the same order
    const holdersMap = new Map<string, TokenHolderNode>([]);

    searchResponse.results.forEach((result) =>
      holdersMap.set(
        result.item.addressId.value,
        new TokenHolderNode(result.item)
      )
    );

    return addressIds.map((addressId) => holdersMap.get(addressId));
  }
}
