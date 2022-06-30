import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet } from '@appvise/graphql';
import { Contract } from '@koiner/contracts/domain';
import { ContractsQuery } from '@koiner/contracts/application';
import { ContractBulkResult, ContractNode, ContractsRequest } from '../dto';

@Resolver(() => ContractBulkResult)
export class ContractsBulkResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [ContractBulkResult], { name: 'contractsBulk' })
  async execute(
    @SelectionSet()
    selectionSet,
    @Args('ids', { type: () => [String] })
    contractIds: string[],
    @Args('first', { type: () => Int, defaultValue: 1000 })
    first?: number
  ): Promise<ContractBulkResult[]> {
    const request = new ContractsRequest();

    request.first = first;
    request.filter = {
      OR: contractIds.map((_contractId) => {
        return {
          id: { equals: _contractId },
        };
      }),
    };

    const searchResponse = await this.queryBus.execute<
      ContractsQuery,
      SearchResponse<Contract>
    >(new ContractsQuery(request, selectionSet));

    const results: ContractBulkResult[] = [];

    contractIds.forEach((contractId) => {
      const result = searchResponse.results.find(
        (_result) => _result.item.id.value === contractId
      );

      results.push(
        new ContractBulkResult(
          result ? new ContractNode(result.item) : undefined
        )
      );
    });

    return results;
  }
}
