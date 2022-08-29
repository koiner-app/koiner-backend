import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../dataloader/token-contracts.loader';
import { TokenEventNode } from '../dto/token-event.node';
import { TokenContractNode } from '../dto/token-contract.node';

@Resolver(() => TokenEventNode)
export class TokenEventContractResolver {
  constructor(private loader: TokenContractsLoader) {}

  @ResolveField('contract', () => TokenContractNode)
  async contract(@Parent() event: TokenEventNode): Promise<TokenContractNode> {
    return this.loader.batch.load(event.contractId);
  }
}
