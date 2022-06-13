import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  BlockRewardBalance,
  BlockRewardBalanceReadRepository,
} from '@koiner/contracts/domain';
import { BlockRewardBalanceQuery } from '.';

@QueryHandler(BlockRewardBalanceQuery)
export class BlockRewardBalanceHandler
  implements IQueryHandler<BlockRewardBalanceQuery>
{
  constructor(
    private readonly readRepository: BlockRewardBalanceReadRepository
  ) {}

  async execute(query: BlockRewardBalanceQuery): Promise<BlockRewardBalance> {
    return this.readRepository.findOneByIdOrThrow(query.id, query.selectionSet);
  }
}
