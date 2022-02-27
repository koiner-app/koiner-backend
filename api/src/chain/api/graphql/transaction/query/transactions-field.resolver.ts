import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { SearchResponse } from '@appvise/search';
import { ConnectionFactory, SelectionSet } from '@appvise/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { BlockNode } from '@koiner/chain/api/graphql/block/dto/block.node';
import { TransactionsRequest } from '@koiner/chain/api/graphql/transaction/dto/transactions.request';
import { TransactionsConnection } from '@koiner/chain/api/graphql/transaction/dto/transactions.connection';
import { TransactionsQuery } from '@koiner/chain/application/transaction/query';
import { Transaction } from '@koiner/chain/domain';
import { TransactionNode } from '@koiner/chain/api/graphql/transaction/dto/transaction.node';

@Resolver((of) => BlockNode)
export class TransactionsFieldResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @ResolveField()
  async transactions(
    @Parent() block: BlockNode,
    @Args() request: TransactionsRequest,
    @SelectionSet() selectionSet,
  ): Promise<TransactionsConnection> {
    if (!request.filter) {
      request.filter = {};
    }

    // TODO: Make NumberFilter work
    // request.filter.blockHeight = { equals: block.header.height.toString() };

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
