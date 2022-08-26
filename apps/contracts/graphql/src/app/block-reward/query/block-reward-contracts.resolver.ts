import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../../token/dataloader/token-contracts.loader';
import { BlockRewardNode } from '../../block-reward/dto/block-reward.node';
import { TokenContractNode } from '../../token/dto/token-contract.node';

@Resolver(() => BlockRewardNode)
export class BlockRewardContractsResolver {
  constructor(private loader: TokenContractsLoader) {}

  @ResolveField('contract', () => TokenContractNode)
  async contract(
    @Parent() blockReward: BlockRewardNode
  ): Promise<TokenContractNode> {
    return this.loader.batch.load(blockReward.contractId);
  }

  @ResolveField('burnedContract', () => TokenContractNode, { nullable: true })
  async burnedContract(
    @Parent() blockReward: BlockRewardNode
  ): Promise<TokenContractNode | undefined> {
    return this.loader.batch.load(blockReward.burnedContractId);
  }
}
