import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TokenHolder,
  TokenHolderReadRepository,
} from '@koiner/tokenize/domain';
import { TokenHolderQuery } from '.';

@QueryHandler(TokenHolderQuery)
export class TokenHolderHandler implements IQueryHandler<TokenHolderQuery> {
  constructor(private readonly readRepository: TokenHolderReadRepository) {}

  async execute(query: TokenHolderQuery): Promise<TokenHolder> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
