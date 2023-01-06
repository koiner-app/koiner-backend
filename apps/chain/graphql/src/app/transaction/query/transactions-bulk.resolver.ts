import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SearchResponse } from '@appvise/domain';
import { SelectionSet } from '@appvise/graphql';
import { Transaction } from '@koiner/chain/domain';
import { TransactionsQuery } from '@koiner/chain/application';
import { TransactionNode, TransactionsRequest } from '../dto';

@Resolver(() => TransactionNode)
export class TransactionsBulkResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [TransactionNode], { name: 'transactionsBulk' })
  async execute(
    @SelectionSet()
    selectionSet,
    @Args('ids', { type: () => [String] })
    transactionIds: string[],
    @Args('first', { type: () => Int, defaultValue: 1000 })
    first?: number
  ): Promise<TransactionNode[]> {
    const request = new TransactionsRequest();

    request.first = first;
    request.filter = {
      OR: transactionIds.map((_transactionId) => {
        return {
          id: { equals: _transactionId },
        };
      }),
    };

    const searchResponse = await this.queryBus.execute<
      TransactionsQuery,
      SearchResponse<Transaction>
    >(new TransactionsQuery(request, selectionSet));

    const results: TransactionNode[] = [];

    console.log(searchResponse);
    searchResponse.results.forEach((result) =>
      results.push(new TransactionNode(result.item))
    );

    return results;
  }
}
