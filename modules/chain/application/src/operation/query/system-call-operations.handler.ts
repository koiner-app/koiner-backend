import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  SystemCallOperation,
  SystemCallOperationReadRepository,
} from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/domain';
import { SystemCallOperationsQuery } from '.';

@QueryHandler(SystemCallOperationsQuery)
export class SystemCallOperationsHandler
  implements IQueryHandler<SystemCallOperationsQuery>
{
  constructor(
    private readonly readRepository: SystemCallOperationReadRepository,
  ) {}

  async execute(
    query: SystemCallOperationsQuery,
  ): Promise<SearchResponse<SystemCallOperation>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
