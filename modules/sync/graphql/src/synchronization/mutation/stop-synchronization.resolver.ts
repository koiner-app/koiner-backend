import { ForbiddenException } from '@nestjs/common';
import { Args, ID, Int, Mutation, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { koinosConfig } from '@koinos/jsonrpc';
import {
  CreateStopSignalCommand,
  SynchronizationQuery,
} from '@koiner/sync/application';
import { SynchronizationNode } from '../dto';
import { Synchronization } from '@koiner/sync/domain';

@Resolver(() => SynchronizationNode)
export class StopSynchronizationResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  @Mutation(() => SynchronizationNode, {
    name: 'stopSynchronization',
  })
  async execute(
    @SelectionSet() selectionSet: any,
    @Args('secret') secret: string,
    @Args({
      name: 'chainId',
      type: () => ID,
      nullable: true,
      description: 'Leave empty to stop synchronization for koinos chain',
    })
    chainId?: string,
    @Args({ name: 'stopAtHeight', type: () => Int, nullable: true })
    stopAtHeight?: number
  ): Promise<SynchronizationNode> {
    if (
      !secret ||
      !koinosConfig.syncSecret ||
      secret !== koinosConfig.syncSecret
    ) {
      throw new ForbiddenException();
    }

    await this.commandBus.execute(
      new CreateStopSignalCommand({
        chainId: chainId ?? koinosConfig.chainId,
        stopAtHeight,
      })
    );

    const synchronization = await this.queryBus.execute<
      SynchronizationQuery,
      Synchronization
    >(new SynchronizationQuery(chainId ?? koinosConfig.chainId, selectionSet));

    return new SynchronizationNode(synchronization);
  }
}
