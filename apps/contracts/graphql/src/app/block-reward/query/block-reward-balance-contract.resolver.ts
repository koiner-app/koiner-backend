import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../../token/dataloader/token-contracts.loader';
import { BlockRewardBalanceNode } from '../dto/block-reward-balance.node';
import { TokenContractNode } from '../../token/dto/token-contract.node';

@Resolver(() => BlockRewardBalanceNode)
export class BlockRewardBalanceContractResolver {
  constructor(private loader: TokenContractsLoader) {}

  @ResolveField('contract', () => TokenContractNode)
  async contract(
    @Parent() balance: BlockRewardBalanceNode
  ): Promise<TokenContractNode> {
    return this.loader.batch.load(balance.contractId);
  }
}
