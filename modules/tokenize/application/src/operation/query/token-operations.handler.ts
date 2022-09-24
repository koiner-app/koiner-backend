import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TokenOperation,
  TokenOperationReadRepository,
} from '@koiner/tokenize/domain';
import { SearchResponse } from '@appvise/domain';
import { TokenOperationsQuery } from '.';

@QueryHandler(TokenOperationsQuery)
export class TokenOperationsHandler
  implements IQueryHandler<TokenOperationsQuery>
{
  constructor(private readonly readRepository: TokenOperationReadRepository) {}

  async execute(
    query: TokenOperationsQuery
  ): Promise<SearchResponse<TokenOperation>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
