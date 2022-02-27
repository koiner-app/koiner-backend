import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Block, BlockReadRepository } from '@koiner/chain/domain';
import { BlockQuery } from './block.query';

@QueryHandler(BlockQuery)
export class BlockHandler implements IQueryHandler<BlockQuery> {
  constructor(private readonly blockReadRepository: BlockReadRepository) {}

  async execute(query: BlockQuery): Promise<Block> {
    return this.blockReadRepository.findOneByHeightOrThrow(
      query.blockHeight,
      query.selectionSet,
    );
  }
}
