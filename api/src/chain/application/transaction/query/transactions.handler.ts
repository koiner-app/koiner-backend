import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Transaction, TransactionReadRepository } from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/search';
import { TransactionsQuery } from './transactions.query';

@QueryHandler(TransactionsQuery)
export class TransactionsHandler implements IQueryHandler<TransactionsQuery> {
  constructor(
    private readonly transactionsReadRepository: TransactionReadRepository,
  ) {}

  async execute(
    query: TransactionsQuery,
  ): Promise<SearchResponse<Transaction>> {
    return this.transactionsReadRepository.find(
      query.request,
      query.selectionSet,
    );
  }
}
