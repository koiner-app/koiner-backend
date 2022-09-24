import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { TokenEvent, TokenEventReadRepository } from '@koiner/tokenize/domain';
import { TokenEventQuery } from '.';

@QueryHandler(TokenEventQuery)
export class TokenEventHandler implements IQueryHandler<TokenEventQuery> {
  constructor(private readonly readRepository: TokenEventReadRepository) {}

  async execute(query: TokenEventQuery): Promise<TokenEvent> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
