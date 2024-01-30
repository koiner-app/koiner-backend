import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet } from '@appvise/graphql';
import { TokenHolder } from '@koiner/tokenize/domain';
import { TokenHoldersQuery } from '@koiner/tokenize/application';
import { TokenHolderNode, TokenHoldersRequest } from '../dto';
import { AddressBalanceService, koinosConfig } from '@koinos/jsonrpc';

@Resolver(() => TokenHolderNode)
export class KoinHoldersBulkResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly addressBalanceService: AddressBalanceService
  ) {}

  @Query(() => [TokenHolderNode], { name: 'koinHoldersBulk' })
  async execute(
    @SelectionSet()
    selectionSet,
    @Args('ids', { type: () => [String] })
    addressIds: string[],
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
        equals: koinosConfig.contracts.koin,
      },
    };

    const searchResponse = await this.queryBus.execute<
      TokenHoldersQuery,
      SearchResponse<TokenHolder>
    >(new TokenHoldersQuery(request, selectionSet));

    // Results must be returned in exactly the same order
    const holdersMap = new Map<string, TokenHolderNode>([]);

    await Promise.all(
      searchResponse.results.map(async (result) => {
        // Load on-chain balances
        const onChainBalance = await this.addressBalanceService.getBalance(
          result.item.contractId.value,
          result.item.addressId.value,
          undefined,
          false
        );

        if (onChainBalance > -1) {
          result.item = new TokenHolder({
            id: result.item.id,
            props: {
              ...result.item.getPropsCopy(),
              balance: onChainBalance,
            },
          });
        }

        holdersMap.set(
          result.item.addressId.value,
          new TokenHolderNode(result.item)
        );

        return result;
      })
    );

    return addressIds.map((addressId) => holdersMap.get(addressId));
  }
}
