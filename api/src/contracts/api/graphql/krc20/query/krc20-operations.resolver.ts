import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';

import { Krc20Operation } from '@koiner/contracts/domain';
import { Krc20OperationNode } from '../dto/krc20-operation.node';
import { Krc20OperationsConnection } from '../dto/krc20-operations.connection';
import { Krc20OperationsRequest } from '../dto/krc20-operations.request';
import { Krc20OperationsQuery } from '@koiner/contracts/application/krc20/query';

@Resolver(() => Krc20OperationNode)
export class Krc20OperationsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => Krc20OperationsConnection, { name: 'krc20Operations' })
  async execute(
    @Args() request: Krc20OperationsRequest,
    @SelectionSet() selectionSet,
  ): Promise<Krc20OperationsConnection> {
    const searchResponse = await this.queryBus.execute<
      Krc20OperationsQuery,
      SearchResponse<Krc20Operation>
    >(new Krc20OperationsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      Krc20OperationsConnection,
      Krc20OperationNode,
      searchResponse,
      selectionSet,
    );
  }
}
