import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Transaction, TransactionReadRepository } from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/domain';
import { TransactionsQuery } from './index';

@QueryHandler(TransactionsQuery)
export class TransactionsHandler implements IQueryHandler<TransactionsQuery> {
  constructor(private readonly readRepository: TransactionReadRepository) {}

  async execute(
    query: TransactionsQuery,
  ): Promise<SearchResponse<Transaction>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
