import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  TokenOperation,
  TokenOperationReadRepository,
} from '@koiner/tokenize/domain';
import { TokenOperationQuery } from '.';

@QueryHandler(TokenOperationQuery)
export class TokenOperationHandler
  implements IQueryHandler<TokenOperationQuery>
{
  constructor(private readonly readRepository: TokenOperationReadRepository) {}

  async execute(query: TokenOperationQuery): Promise<TokenOperation> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
