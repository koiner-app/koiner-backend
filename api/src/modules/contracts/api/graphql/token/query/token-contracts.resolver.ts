import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';

import { TokenContract } from '@koiner/contracts/domain';
import { TokenContractsQuery } from '@koiner/contracts/application/token/query';
import { TokenContractsRequest } from '../dto/token-contracts.request';
import { TokenContractsConnection } from '../dto/token-contracts.connection';
import { TokenContractNode } from '../dto/token-contract.node';

@Resolver(() => TokenContractNode)
export class TokenContractsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => TokenContractsConnection, { name: 'tokenContracts' })
  async execute(
    @Args() request: TokenContractsRequest,
    @SelectionSet() selectionSet,
  ): Promise<TokenContractsConnection> {
    const searchResponse = await this.queryBus.execute<
      TokenContractsQuery,
      SearchResponse<TokenContract>
    >(new TokenContractsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      TokenContractsConnection,
      TokenContractNode,
      searchResponse,
      selectionSet,
    );
  }
}