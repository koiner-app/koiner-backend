import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ContractEventsLoader } from '../../contract/dataloader/contract-events.loader';
import { ContractEventNode } from '../../contract/dto/contract-event.node';
import { TokenEventNode } from '../dto/token-event.node';

@Resolver(() => TokenEventNode)
export class TokenEventContractEventResolver {
  constructor(private loader: ContractEventsLoader) {}

  @ResolveField('contractEvent', () => ContractEventNode)
  async contractEvent(
    @Parent() event: TokenEventNode
  ): Promise<ContractEventNode> {
    return this.loader.batch.load(event.id);
  }
}
