import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Chain, ChainReadRepository } from '@koiner/chain/domain';
import { ChainQuery } from '.';

@QueryHandler(ChainQuery)
export class ChainHandler implements IQueryHandler<ChainQuery> {
  constructor(private readonly readRepository: ChainReadRepository) {}

  async execute(query: ChainQuery): Promise<Chain> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
