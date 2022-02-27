import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Block, BlockReadRepository } from '@koiner/chain/domain';
import { SearchResponse } from '@appvise/search';
import { BlocksQuery } from './blocks.query';

@QueryHandler(BlocksQuery)
export class BlocksHandler implements IQueryHandler<BlocksQuery> {
  constructor(private readonly blocksReadRepository: BlockReadRepository) {}

  async execute(query: BlocksQuery): Promise<SearchResponse<Block>> {
    return this.blocksReadRepository.find(query.request, query.selectionSet);
  }
}
