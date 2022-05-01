import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { SystemContractOperationsQuery } from '@koiner/chain/application/operation/query';
import { SystemContractOperation } from '@koiner/chain/domain';
import { OperationsRequest } from '@koiner/chain/api/graphql/operation/dto/operations.request';
import { SystemContractOperationNode } from '../dto/system-contract-operation.node';

@Injectable({ scope: Scope.REQUEST })
export class SystemContractOperationsLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(async (operationIds: string[]) => {
    const request = new OperationsRequest();
    request.filter = {
      OR: operationIds.map((operationId) => {
        return { id: { equals: operationId } };
      }),
    };
    const selectionSet = undefined;

    const searchResponse = await this.queryBus.execute<
      SystemContractOperationsQuery,
      SearchResponse<SystemContractOperation>
    >(new SystemContractOperationsQuery(request, selectionSet));

    const operationsMap = new Map(
      searchResponse.results.map((result) => [
        result.item.id.value,
        new SystemContractOperationNode(result.item),
      ]),
    );

    return operationIds.map((operationId) => operationsMap.get(operationId));
  });
}
