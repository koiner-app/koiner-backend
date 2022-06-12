import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../../token/dataloader/token-contracts.loader';
import { BlockRewardNode } from '../../block-reward/dto/block-reward.node';
import { TokenContractNode } from '../../token/dto/token-contract.node';

@Resolver(() => BlockRewardNode)
export class BlockRewardContractResolver {
  constructor(private loader: TokenContractsLoader) {}

  @ResolveField('contract', () => TokenContractNode, { nullable: true })
  async contract(
    @Parent() balance: BlockRewardNode
  ): Promise<TokenContractNode | undefined> {
    return this.loader.batch.load(balance.contractId);
  }
}
