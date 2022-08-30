import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { Operation } from '@koiner/chain/domain';
import { OperationsQuery } from '@koiner/chain/application';
import { OperationNode, OperationsConnection, OperationsRequest } from '../dto';

@Resolver(() => OperationNode)
export class OperationsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => OperationsConnection, { name: 'operations' })
  async execute(
    @Args() request: OperationsRequest,
    @SelectionSet() selectionSet
  ): Promise<OperationsConnection> {
    const searchResponse = await this.queryBus.execute<
      OperationsQuery,
      SearchResponse<Operation>
    >(new OperationsQuery(request, selectionSet, ['id', 'transactionId']));

    return ConnectionFactory.fromSearchResponse(
      OperationsConnection,
      OperationNode,
      searchResponse,
      selectionSet
    );
  }
}
