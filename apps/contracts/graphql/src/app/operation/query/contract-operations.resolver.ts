import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { ContractOperation } from '@koiner/contracts/domain';
import { ContractOperationsQuery } from '@koiner/contracts/application';
import {
  ContractOperationNode,
  ContractOperationsConnection,
  ContractOperationsRequest,
} from '../dto';

@Resolver(() => ContractOperationNode)
export class ContractOperationsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ContractOperationsConnection, { name: 'contractOperations' })
  async execute(
    @Args() request: ContractOperationsRequest,
    @SelectionSet() selectionSet
  ): Promise<ContractOperationsConnection> {
    const searchResponse = await this.queryBus.execute<
      ContractOperationsQuery,
      SearchResponse<ContractOperation>
    >(
      new ContractOperationsQuery(request, selectionSet, [
        'id',
        'contractId',
        'name',
      ])
    );

    return ConnectionFactory.fromSearchResponse(
      ContractOperationsConnection,
      ContractOperationNode,
      searchResponse,
      selectionSet
    );
  }
}
