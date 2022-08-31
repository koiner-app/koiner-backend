import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { TokenContractsLoader } from '../../token/dataloader/token-contracts.loader';
import { BlockProducerNode } from '../dto/block-producer.node';
import { TokenContractNode } from '../../token/dto/token-contract.node';

@Resolver(() => BlockProducerNode)
export class BlockProducerContractResolver {
  constructor(private loader: TokenContractsLoader) {}

  @ResolveField('contract', () => TokenContractNode)
  async contract(
    @Parent() balance: BlockProducerNode
  ): Promise<TokenContractNode> {
    return this.loader.batch.load(balance.contractId);
  }
}
