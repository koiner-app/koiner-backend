import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '@koiner/contracts/api/graphql/token/dataloader/token-contracts.loader';
import { TokenBalanceNode } from '@koiner/contracts/api/graphql/token/dto/token-balance.node';
import { TokenContractNode } from '@koiner/contracts/api/graphql/token/dto/token-contract.node';

@Resolver(() => TokenBalanceNode)
export class TokenBalanceContractResolver {
  constructor(private loader: TokenContractsLoader) {}

  @ResolveField('contract', () => TokenContractNode, { nullable: true })
  async contract(
    @Parent() balance: TokenBalanceNode,
  ): Promise<TokenContractNode | undefined> {
    return this.loader.batch.load(balance.contractId);
  }
}
