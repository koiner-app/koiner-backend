import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Chain, ChainReadRepository } from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/domain';
import { ChainsQuery } from './index';

@QueryHandler(ChainsQuery)
export class ChainsHandler implements IQueryHandler<ChainsQuery> {
  constructor(private readonly readRepository: ChainReadRepository) {}

  async execute(query: ChainsQuery): Promise<SearchResponse<Chain>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
