import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  UploadContractOperation,
  UploadContractOperationReadRepository,
} from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/domain';
import { UploadContractOperationsQuery } from './index';

@QueryHandler(UploadContractOperationsQuery)
export class UploadContractOperationsHandler
  implements IQueryHandler<UploadContractOperationsQuery>
{
  constructor(
    private readonly readRepository: UploadContractOperationReadRepository,
  ) {}

  async execute(
    query: UploadContractOperationsQuery,
  ): Promise<SearchResponse<UploadContractOperation>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
