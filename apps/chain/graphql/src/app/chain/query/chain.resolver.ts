import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { koinosConfig } from '@koinos/jsonrpc';
import { Chain } from '@koiner/chain/domain';
import { ChainQuery } from '@koiner/chain/application';
import { ChainNode } from '../dto';

@Resolver(() => ChainNode)
export class ChainResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => ChainNode, { name: 'chain' })
  async execute(
    @SelectionSet() selectionSet: SelectionSetObject,
    @Args({
      name: 'id',
      type: () => ID,
      nullable: true,
      description: 'Leave empty to retrieve koinos chain',
    })
    id?: string
  ): Promise<ChainNode> {
    const chain: Chain = await this.queryBus.execute<ChainQuery, Chain>(
      new ChainQuery(id ?? koinosConfig.chainId, selectionSet)
    );

    return new ChainNode(chain);
  }
}
