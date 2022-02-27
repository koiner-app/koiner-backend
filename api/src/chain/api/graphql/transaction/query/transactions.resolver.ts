import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/search';
import { SelectionSet, ConnectionFactory } from '@appvise/graphql';

import { Transaction } from '@koiner/chain/domain';
import { TransactionsQuery } from '@koiner/chain/application/transaction/query';
import { TransactionsRequest } from '../dto/transactions.request';
import { TransactionsConnection } from '../dto/transactions.connection';
import { TransactionNode } from '../dto/transaction.node';

@Resolver((of) => Transaction)
export class TransactionsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query((returns) => TransactionsConnection, { name: 'transactions' })
  async execute(
    @Args() request: TransactionsRequest,
    @SelectionSet() selectionSet,
  ): Promise<TransactionsConnection> {
    const searchResponse = await this.queryBus.execute<
      TransactionsQuery,
      SearchResponse<Transaction>
    >(new TransactionsQuery(request, selectionSet));

    return ConnectionFactory.fromSearchResponse(
      TransactionsConnection,
      TransactionNode,
      searchResponse,
      selectionSet,
    );
  }
}
