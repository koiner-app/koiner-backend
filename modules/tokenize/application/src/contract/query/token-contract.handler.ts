import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TokenContract,
  TokenContractReadRepository,
} from '@koiner/tokenize/domain';
import { TokenContractQuery } from '.';

@QueryHandler(TokenContractQuery)
export class TokenContractHandler implements IQueryHandler<TokenContractQuery> {
  constructor(private readonly readRepository: TokenContractReadRepository) {}

  async execute(query: TokenContractQuery): Promise<TokenContract> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
