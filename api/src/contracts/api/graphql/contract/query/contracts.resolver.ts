import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/search';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';

import { Contract } from '@koiner/contracts/domain';
import { ContractsQuery } from '@koiner/contracts/application/contract/query';
import { ContractsRequest } from '../dto/contracts.request';
import { ContractsConnection } from '../dto/contracts.connection';
import { ContractNode } from '../dto/contract.node';

@Resolver(() => ContractNode)
export class ContractsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ContractsConnection, { name: 'contracts' })
  async execute(
    @Args() request: ContractsRequest,
    @SelectionSet() selectionSet,
  ): Promise<ContractsConnection> {
    const searchResponse = await this.queryBus.execute<
      ContractsQuery,
      SearchResponse<Contract>
    >(new ContractsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      ContractsConnection,
      ContractNode,
      searchResponse,
      selectionSet,
    );
  }
}
