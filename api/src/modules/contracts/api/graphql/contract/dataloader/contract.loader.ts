import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { Contract } from '@koiner/contracts/domain';
import { ContractsQuery } from '@koiner/contracts/application';
import { ContractNode, ContractsRequest } from '../dto';

@Injectable({ scope: Scope.REQUEST })
export class ContractsLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(async (contractIds: string[]) => {
    const request = new ContractsRequest();
    request.filter = {
      OR: contractIds.map((contractId) => {
        return { id: { equals: contractId } };
      }),
    };
    const selectionSet = undefined;

    const searchResponse = await this.queryBus.execute<
      ContractsQuery,
      SearchResponse<Contract>
    >(new ContractsQuery(request, selectionSet));

    const operationsMap = new Map(
      searchResponse.results.map((result) => [
        result.item.id.value,
        new ContractNode(result.item),
      ]),
    );

    return contractIds.map((contractId) => operationsMap.get(contractId));
  });
}
