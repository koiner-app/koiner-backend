import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Block, BlockReadRepository } from '@koiner/chain/domain';
import { BlockQuery } from './dto/block.query';

@QueryHandler(BlockQuery)
export class BlockHandler implements IQueryHandler<BlockQuery> {
  constructor(private readonly readRepository: BlockReadRepository) {}

  async execute(query: BlockQuery): Promise<Block> {
    return this.readRepository.findOneByHeightOrThrow(
      query.blockHeight,
      query.selectionSet,
    );
  }
}
