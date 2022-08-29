import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  ContractEvent,
  ContractEventReadRepository,
} from '@koiner/contracts/domain';
import { SearchResponse } from '@appvise/domain';
import { ContractEventsQuery } from '.';

@QueryHandler(ContractEventsQuery)
export class ContractEventsHandler
  implements IQueryHandler<ContractEventsQuery>
{
  constructor(private readonly readRepository: ContractEventReadRepository) {}

  async execute(
    query: ContractEventsQuery
  ): Promise<SearchResponse<ContractEvent>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
