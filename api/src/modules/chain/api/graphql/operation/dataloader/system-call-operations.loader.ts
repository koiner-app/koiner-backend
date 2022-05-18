import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { SystemCallOperation } from '@koiner/chain/domain';
import { SystemCallOperationsQuery } from '@koiner/chain/application';
import { OperationsRequest } from '../dto/operations.request';
import { SystemCallOperationNode } from '../dto/system-call-operation.node';

@Injectable({ scope: Scope.REQUEST })
export class SystemCallOperationsLoader {
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
      SystemCallOperationsQuery,
      SearchResponse<SystemCallOperation>
    >(new SystemCallOperationsQuery(request, selectionSet));

    const operationsMap = new Map(
      searchResponse.results.map((result) => [
        result.item.id.value,
        new SystemCallOperationNode(result.item),
      ]),
    );

    return operationIds.map((operationId) => operationsMap.get(operationId));
  });
}
