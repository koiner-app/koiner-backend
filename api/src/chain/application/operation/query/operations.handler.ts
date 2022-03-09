import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Operation, OperationReadRepository } from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/search';
import { OperationsQuery } from './operations.query';

@QueryHandler(OperationsQuery)
export class OperationsHandler implements IQueryHandler<OperationsQuery> {
  constructor(private readonly readRepository: OperationReadRepository) {}

  async execute(query: OperationsQuery): Promise<SearchResponse<Operation>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}