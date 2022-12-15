import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { koinosConfig } from '@koinos/jsonrpc';
import { KoinStats } from '@koiner/tokenize/domain';
import { KoinStatsQuery } from '@koiner/tokenize/application';
import { KoinStatsNode } from '../dto';

@Resolver(() => KoinStatsNode)
export class KoinStatsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => KoinStatsNode, { name: 'koinStats' })
  async execute(
    @SelectionSet() selectionSet: SelectionSetObject,
    @Args({
      name: 'id',
      type: () => ID,
      nullable: true,
    })
    id?: string
  ): Promise<KoinStatsNode> {
    const koinStats: KoinStats = await this.queryBus.execute<
      KoinStatsQuery,
      KoinStats
    >(new KoinStatsQuery(id ?? koinosConfig.chainId, selectionSet));

    return new KoinStatsNode(koinStats);
  }
}
