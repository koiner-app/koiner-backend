import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../../contract/dataloader/token-contracts.loader';
import { TokenContractNode } from '../../contract/dto/token-contract.node';
import { TokenOperationNode } from '../dto';

@Resolver(() => TokenOperationNode)
export class TokenOperationContractResolver {
  constructor(private loader: TokenContractsLoader) {}

  @ResolveField('contract', () => TokenContractNode)
  async contract(
    @Parent() operation: TokenOperationNode
  ): Promise<TokenContractNode> {
    return this.loader.batch.load(operation.contractId);
  }
}
