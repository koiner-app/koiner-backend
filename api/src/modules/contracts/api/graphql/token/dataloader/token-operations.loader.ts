import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { TokenOperation } from '@koiner/contracts/domain';
import { TokenOperationsQuery } from '@koiner/contracts/application';
import { OperationsRequest } from '@koiner/chain/api/graphql/operation/dto/operations.request';
import { TokenOperationNode } from '../dto/token-operation.node';

@Injectable({ scope: Scope.REQUEST })
export class TokenOperationsLoader {
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
      TokenOperationsQuery,
      SearchResponse<TokenOperation>
    >(new TokenOperationsQuery(request, selectionSet));

    const operationsMap = new Map(
      searchResponse.results.map((result) => [
        result.item.id.value,
        new TokenOperationNode(result.item),
      ]),
    );

    return operationIds.map((operationId) => operationsMap.get(operationId));
  });
}
