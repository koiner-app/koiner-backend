import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/search';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';

import { Operation } from '@koiner/chain/domain';
import { OperationsQuery } from '@koiner/chain/application/operation/query';
import { OperationsRequest } from '../dto/operations.request';
import { OperationsConnection } from '../dto/operations.connection';
import { OperationNode } from '../dto/operation.node';

@Resolver(() => OperationNode)
export class OperationsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => OperationsConnection, { name: 'operations' })
  async execute(
    @Args() request: OperationsRequest,
    @SelectionSet() selectionSet,
  ): Promise<OperationsConnection> {
    const searchResponse = await this.queryBus.execute<
      OperationsQuery,
      SearchResponse<Operation>
    >(new OperationsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      OperationsConnection,
      OperationNode,
      searchResponse,
      selectionSet,
    );
  }
}
