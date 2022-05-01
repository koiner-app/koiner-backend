import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Block, BlockReadRepository } from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/domain';
import { BlocksQuery } from './index';

@QueryHandler(BlocksQuery)
export class BlocksHandler implements IQueryHandler<BlocksQuery> {
  constructor(private readonly readRepository: BlockReadRepository) {}

  async execute(query: BlocksQuery): Promise<SearchResponse<Block>> {
    return this.readRepository.find(query.request, query.selectionSet);
  }
}
