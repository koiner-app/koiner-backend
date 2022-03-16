import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/search';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';

import { Krc20Contract } from '@koiner/contracts/domain';
import { Krc20ContractsQuery } from '@koiner/contracts/application/krc20/query';
import { Krc20ContractsRequest } from '../dto/krc20-contracts.request';
import { Krc20ContractsConnection } from '../dto/krc20-contracts.connection';
import { Krc20ContractNode } from '../dto/krc20-contract.node';

@Resolver(() => Krc20ContractNode)
export class Krc20ContractsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => Krc20ContractsConnection, { name: 'krc20Contracts' })
  async execute(
    @Args() request: Krc20ContractsRequest,
    @SelectionSet() selectionSet,
  ): Promise<Krc20ContractsConnection> {
    const searchResponse = await this.queryBus.execute<
      Krc20ContractsQuery,
      SearchResponse<Krc20Contract>
    >(new Krc20ContractsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      Krc20ContractsConnection,
      Krc20ContractNode,
      searchResponse,
      selectionSet,
    );
  }
}
