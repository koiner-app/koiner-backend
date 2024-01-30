import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { TokenContract } from '@koiner/tokenize/domain';
import { TokenContractsQuery } from '@koiner/tokenize/application';
import {
  TokenContractNode,
  TokenContractsConnection,
  TokenContractsRequest,
} from '../dto';
import { TotalSupplyService } from '@koinos/jsonrpc';

@Resolver(() => TokenContractNode)
export class TokenContractsResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly totalSupplyService: TotalSupplyService
  ) {}

  @Query(() => TokenContractsConnection, { name: 'tokenContracts' })
  async execute(
    @Args() request: TokenContractsRequest,
    @SelectionSet() selectionSet: SelectionSetObject
  ): Promise<TokenContractsConnection> {
    const searchResponse = await this.queryBus.execute<
      TokenContractsQuery,
      SearchResponse<TokenContract>
    >(new TokenContractsQuery(request, selectionSet, ['id', 'name', 'symbol']));

    const connection = ConnectionFactory.fromSearchResponse(
      TokenContractsConnection,
      TokenContractNode,
      searchResponse,
      selectionSet
    );

    if (
      connection?.edges &&
      selectionSet.isSelected('edges.node.totalSupply')
    ) {
      // Load on-chain balances
      await Promise.all(
        connection?.edges?.map(async (edge) => {
          const onChainSupply = await this.totalSupplyService.getTokenSupply(
            edge.node.id,
            undefined,
            false
          );

          if (onChainSupply > -1) {
            edge.node.totalSupply = onChainSupply.toString();
          }

          return edge;
        })
      );
    }

    return connection;
  }
}
