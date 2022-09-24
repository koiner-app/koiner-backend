import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../../contract/dataloader/token-contracts.loader';
import { TokenContractNode } from '../../contract/dto/token-contract.node';
import { TokenHolderNode } from '../dto';

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
