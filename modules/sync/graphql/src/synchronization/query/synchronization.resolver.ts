import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { koinosConfig } from '@koinos/jsonrpc';
import { Synchronization } from '@koiner/sync/domain';
import { SynchronizationQuery } from '@koiner/sync/application';
import { SynchronizationNode } from '../dto';

@Resolver(() => SynchronizationNode)
export class SynchronizationResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => SynchronizationNode, { name: 'synchronization' })
  async execute(
    @SelectionSet() selectionSet: SelectionSetObject,
    @Args({
      name: 'chainId',
      type: () => ID,
      nullable: true,
      description: 'Leave empty to stop synchronization for koinos chain',
    })
    chainId?: string
  ): Promise<SynchronizationNode> {
    const synchronization = await this.queryBus.execute<
      SynchronizationQuery,
      Synchronization
    >(new SynchronizationQuery(chainId ?? koinosConfig.chainId, selectionSet));

    return new SynchronizationNode(synchronization);
  }
}
