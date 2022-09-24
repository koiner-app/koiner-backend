import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../../contract/dataloader/token-contracts.loader';
import { TokenContractNode } from '../../contract/dto/token-contract.node';
import { TokenEventNode } from '../dto/token-event.node';

@Resolver(() => TokenEventNode)
export class TokenEventContractResolver {
  constructor(private loader: TokenContractsLoader) {}

  @ResolveField('contract', () => TokenContractNode)
  async contract(@Parent() event: TokenEventNode): Promise<TokenContractNode> {
    return this.loader.batch.load(event.contractId);
  }
}
