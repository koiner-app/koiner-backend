import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';
import { Contract } from '@koiner/contracts/domain';
import { ContractsQuery } from '@koiner/contracts/application';
import { ContractNode, ContractsConnection, ContractsRequest } from '../dto';

@Resolver(() => ContractNode)
export class ContractsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ContractsConnection, { name: 'contracts' })
  async execute(
    @Args() request: ContractsRequest,
    @SelectionSet() selectionSet
  ): Promise<ContractsConnection> {
    const searchResponse = await this.queryBus.execute<
      ContractsQuery,
      SearchResponse<Contract>
    >(new ContractsQuery(request, selectionSet, ['id']));

    return ConnectionFactory.fromSearchResponse(
      ContractsConnection,
      ContractNode,
      searchResponse,
      selectionSet
    );
  }
}
