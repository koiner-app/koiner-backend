import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { TokenHolder } from '@koiner/tokenize/domain';
import { TokenHoldersQuery } from '@koiner/tokenize/application';
import {
  TokenHolderNode,
  TokenHoldersConnection,
  TokenHoldersRequest,
} from '../dto';
import { AddressBalanceService } from '@koinos/jsonrpc';

@Resolver(() => TokenHolderNode)
export class TokenHoldersResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly addressBalanceService: AddressBalanceService
  ) {}

  @Query(() => TokenHoldersConnection, { name: 'tokenHolders' })
  async execute(
    @Args() request: TokenHoldersRequest,
    @SelectionSet() selectionSet
  ): Promise<TokenHoldersConnection> {
    const searchResponse = await this.queryBus.execute<
      TokenHoldersQuery,
      SearchResponse<TokenHolder>
    >(
      new TokenHoldersQuery(request, selectionSet, ['addressId', 'contractId'])
    );

    const connection = ConnectionFactory.fromSearchResponse(
      TokenHoldersConnection,
      TokenHolderNode,
      searchResponse,
      selectionSet
    );

    if (connection?.edges) {
      // Load on-chain balances
      await Promise.all(
        connection?.edges?.map(async (edge) => {
          const onChainBalance = await this.addressBalanceService.getBalance(
            edge.node.contractId,
            edge.node.addressId,
            undefined,
            false
          );

          if (onChainBalance > -1) {
            edge.node.balance = onChainBalance.toString();
          }

          return edge;
        })
      );
    }

    return connection;
  }
}
