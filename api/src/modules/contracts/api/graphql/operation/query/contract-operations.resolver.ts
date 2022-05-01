import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';

import { ContractOperation } from '@koiner/contracts/domain';
import { ContractOperationsQuery } from '@koiner/contracts/application/operation/query';
import { ContractOperationsRequest } from '../dto/contract-operations.request';
import { ContractOperationsConnection } from '../dto/contract-operations.connection';
import { ContractOperationNode } from '../dto/contract-operation.node';

@Resolver(() => ContractOperationNode)
export class ContractOperationsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ContractOperationsConnection, { name: 'contractOperations' })
  async execute(
    @Args() request: ContractOperationsRequest,
    @SelectionSet() selectionSet,
  ): Promise<ContractOperationsConnection> {
    const searchResponse = await this.queryBus.execute<
      ContractOperationsQuery,
      SearchResponse<ContractOperation>
    >(new ContractOperationsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      ContractOperationsConnection,
      ContractOperationNode,
      searchResponse,
      selectionSet,
    );
  }
}
