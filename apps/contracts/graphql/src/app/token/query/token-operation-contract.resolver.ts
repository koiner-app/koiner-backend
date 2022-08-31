import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../dataloader/token-contracts.loader';
import { TokenOperationNode } from '../dto/token-operation.node';
import { TokenContractNode } from '../dto/token-contract.node';

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
