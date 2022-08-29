import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ContractsLoader } from '../dataloader/contracts.loader';
import { ContractEventNode } from '../dto/contract-event.node';
import { ContractNode } from '../dto/contract.node';

@Resolver(() => ContractEventNode)
export class ContractEventContractResolver {
  constructor(private loader: ContractsLoader) {}

  @ResolveField('contract', () => ContractNode)
  async contract(@Parent() balance: ContractEventNode): Promise<ContractNode> {
    return this.loader.batch.load(balance.contractId);
  }
}
