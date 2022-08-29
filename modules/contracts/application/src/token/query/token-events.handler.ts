import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TokenEvent, TokenEventReadRepository } from '@koiner/contracts/domain';
import { SearchResponse } from '@appvise/domain';
import { TokenEventsQuery } from '.';

@QueryHandler(TokenEventsQuery)
export class TokenEventsHandler implements IQueryHandler<TokenEventsQuery> {
  constructor(private readonly readRepository: TokenEventReadRepository) {}

  async execute(query: TokenEventsQuery): Promise<SearchResponse<TokenEvent>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
