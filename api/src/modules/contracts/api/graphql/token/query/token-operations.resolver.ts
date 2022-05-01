import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';

import { TokenOperation } from '@koiner/contracts/domain';
import { TokenOperationNode } from '../dto/token-operation.node';
import { TokenOperationsConnection } from '../dto/token-operations.connection';
import { TokenOperationsRequest } from '../dto/token-operations.request';
import { TokenOperationsQuery } from '@koiner/contracts/application/token/query';

@Resolver(() => TokenOperationNode)
export class TokenOperationsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => TokenOperationsConnection, { name: 'tokenOperations' })
  async execute(
    @Args() request: TokenOperationsRequest,
    @SelectionSet() selectionSet,
  ): Promise<TokenOperationsConnection> {
    const searchResponse = await this.queryBus.execute<
      TokenOperationsQuery,
      SearchResponse<TokenOperation>
    >(new TokenOperationsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      TokenOperationsConnection,
      TokenOperationNode,
      searchResponse,
      selectionSet,
    );
  }
}
