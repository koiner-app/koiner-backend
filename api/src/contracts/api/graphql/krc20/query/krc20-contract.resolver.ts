import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { Krc20ContractQuery } from '@koiner/contracts/application/krc20/query/krc20-contract.query';
import { Krc20ContractNode } from '../dto/krc20-contract.node';
import { Krc20Contract } from '@koiner/contracts/domain';

@Resolver(() => Krc20ContractNode)
export class Krc20ContractResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => Krc20ContractNode, { name: 'krc20Contract' })
  async execute(
    @Args({ name: 'id', type: () => ID }) id: string,
    @SelectionSet() selectionSet: SelectionSetObject,
  ): Promise<Krc20ContractNode> {
    const entity = await this.queryBus.execute<
      Krc20ContractQuery,
      Krc20Contract
    >(new Krc20ContractQuery(id, selectionSet));

    return new Krc20ContractNode(entity);
  }
}
