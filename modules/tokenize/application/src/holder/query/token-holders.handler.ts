import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TokenHolder,
  TokenHolderReadRepository,
} from '@koiner/tokenize/domain';
import { SearchResponse } from '@appvise/domain';
import { TokenHoldersQuery } from '.';

@QueryHandler(TokenHoldersQuery)
export class TokenHoldersHandler implements IQueryHandler<TokenHoldersQuery> {
  constructor(private readonly readRepository: TokenHolderReadRepository) {}

  async execute(
    query: TokenHoldersQuery
  ): Promise<SearchResponse<TokenHolder>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
