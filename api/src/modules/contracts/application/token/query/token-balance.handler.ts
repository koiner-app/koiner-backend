import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TokenBalance,
  TokenBalanceReadRepository,
} from '@koiner/contracts/domain';
import { TokenBalanceQuery } from '.';

@QueryHandler(TokenBalanceQuery)
export class TokenBalanceHandler implements IQueryHandler<TokenBalanceQuery> {
  constructor(private readonly readRepository: TokenBalanceReadRepository) {}

  async execute(query: TokenBalanceQuery): Promise<TokenBalance> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
