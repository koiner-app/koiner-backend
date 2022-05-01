import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SearchResponse } from '@appvise/domain';
import { ConnectionFactory, SelectionSet } from '@appvise/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { AddressNode } from '@koiner/chain/api/graphql/address/dto/address.node';
import { TokenOperation } from '@koiner/contracts/domain';
import { TokenOperationsRequest } from '@koiner/contracts/api/graphql/token/dto/token-operations.request';
import { TokenOperationsQuery } from '@koiner/contracts/application/token/query';
import { TokenOperationsConnection } from '@koiner/contracts/api/graphql/token/dto/token-operations.connection';
import { TokenOperationNode } from '@koiner/contracts/api/graphql/token/dto/token-operation.node';

@Resolver(() => AddressNode)
export class AddressTokenOperationsFieldResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @ResolveField('tokenOperations', () => TokenOperationsConnection)
  async tokenOperations(
    @Parent() address: AddressNode,
    @Args() request: TokenOperationsRequest,
    @SelectionSet() selectionSet,
  ): Promise<TokenOperationsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    request.filter.OR = [
      {
        from: { equals: address.id },
      },
      {
        to: { equals: address.id },
      },
    ];

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
