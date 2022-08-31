import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../../token/dataloader/token-contracts.loader';
import { TokenHolderNode } from '../../token/dto/token-holder.node';
import { TokenContractNode } from '../../token/dto/token-contract.node';

@Resolver(() => TokenHolderNode)
export class TokenHolderContractResolver {
  constructor(private loader: TokenContractsLoader) {}

  @ResolveField('contract', () => TokenContractNode)
  async contract(
    @Parent() balance: TokenHolderNode
  ): Promise<TokenContractNode> {
    return this.loader.batch.load(balance.contractId);
  }
}
