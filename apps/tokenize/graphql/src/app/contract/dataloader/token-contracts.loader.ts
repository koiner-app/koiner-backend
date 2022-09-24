import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { TokenContractsRequest } from '../dto';
import { TokenContract } from '@koiner/tokenize/domain';
import { TokenContractsQuery } from '@koiner/tokenize/application';
import { TokenContractNode } from '../dto/token-contract.node';

@Injectable({ scope: Scope.REQUEST })
export class TokenContractsLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(async (contractIds: string[]) => {
    const request = new TokenContractsRequest();
    request.first = 1000;
    request.filter = {
      OR: contractIds.map((contractId) => {
        return { id: { equals: contractId } };
      }),
    };
    const selectionSet = undefined;

    const searchResponse = await this.queryBus.execute<
      TokenContractsQuery,
      SearchResponse<TokenContract>
    >(new TokenContractsQuery(request, selectionSet));

    const contractsMap = new Map(
      searchResponse.results.map((result) => [
        result.item.id.value,
        new TokenContractNode(result.item),
      ])
    );

    return contractIds.map((contractId) => contractsMap.get(contractId));
  });
}
