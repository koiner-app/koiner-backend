import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TokenStats, TokenStatsReadRepository } from '@koiner/tokenize/domain';
import { TokenStatsQuery } from '.';

@QueryHandler(TokenStatsQuery)
export class TokenStatsHandler implements IQueryHandler<TokenStatsQuery> {
  constructor(private readonly readRepository: TokenStatsReadRepository) {}

  async execute(query: TokenStatsQuery): Promise<TokenStats> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
