import { Injectable, Scope } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import * as DataLoader from 'dataloader';
import { SearchResponse } from '@appvise/domain';
import { Transaction } from '@koiner/chain/domain';
import { TransactionsQuery } from '@koiner/chain/application';
import { TransactionNode, TransactionsRequest } from '../dto';

@Injectable({ scope: Scope.REQUEST })
export class TransactionsLoader {
  constructor(private readonly queryBus: QueryBus) {}

  public readonly batch = new DataLoader(
    async (transactionIds: readonly string[]) => {
      const request = new TransactionsRequest();
      request.first = 1000;
      request.filter = {
        OR: transactionIds.map((transactionId) => {
          return { id: { equals: transactionId } };
        }),
      };
      const selectionSet = undefined;

      const searchResponse = await this.queryBus.execute<
        TransactionsQuery,
        SearchResponse<Transaction>
      >(new TransactionsQuery(request, selectionSet));

      const transactionsMap = new Map(
        searchResponse.results.map((result) => [
          result.item.id.value,
          new TransactionNode(result.item),
        ]),
      );

      return transactionIds.map((transactionId) =>
        transactionsMap.get(transactionId),
      );
    },
  );
}
