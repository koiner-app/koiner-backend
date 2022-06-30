import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet } from '@appvise/graphql';
import { ContractOperation } from '@koiner/contracts/domain';
import { ContractOperationsQuery } from '@koiner/contracts/application';
import {
  ContractOperationBulkResult,
  ContractOperationNode,
  ContractOperationsRequest,
} from '../dto';

@Resolver(() => ContractOperationBulkResult)
export class ContractOperationsBulkResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [ContractOperationBulkResult], {
    name: 'contractOperationsBulk',
  })
  async execute(
    @SelectionSet()
    selectionSet,
    @Args('ids', { type: () => [String] })
    operationIds: string[],
    @Args('first', { type: () => Int, defaultValue: 1000 })
    first?: number
  ): Promise<ContractOperationBulkResult[] | null> {
    const request = new ContractOperationsRequest();

    request.first = first;
    request.filter = {
      OR: operationIds.map((_operationId) => {
        return {
          id: { equals: _operationId },
        };
      }),
    };

    const searchResponse = await this.queryBus.execute<
      ContractOperationsQuery,
      SearchResponse<ContractOperation>
    >(new ContractOperationsQuery(request, selectionSet));

    const results: ContractOperationBulkResult[] = [];

    operationIds.forEach((operationId) => {
      const result = searchResponse.results.find(
        (_result) => _result.item.id.value === operationId
      );

      results.push(
        new ContractOperationBulkResult(
          result ? new ContractOperationNode(result.item) : undefined
        )
      );
    });

    return results;
  }
}
