import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  BlockReward,
  BlockRewardReadRepository,
} from '@koiner/contracts/domain';
import { BlockRewardQuery } from '.';

@QueryHandler(BlockRewardQuery)
export class BlockRewardHandler implements IQueryHandler<BlockRewardQuery> {
  constructor(private readonly readRepository: BlockRewardReadRepository) {}

  async execute(query: BlockRewardQuery): Promise<BlockReward> {
    return this.readRepository.findOneByHeightOrThrow(
      query.blockHeight,
      query.selectionSet,
    );
  }
}
