import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { QueryBus } from '@nestjs/cqrs';
import { SelectionSet } from '@appvise/graphql';
import { SelectionSet as SelectionSetObject } from '@appvise/domain';
import { BlockProductionStats } from '@koiner/network/domain';
import {
  BlockProductionStatsByContractIdQuery,
  BlockProductionStatsQuery,
} from '@koiner/network/application';
import { BlockProductionStatsNode } from '../dto';
import { koinosConfig } from '@koinos/jsonrpc';

@Resolver(() => BlockProductionStatsNode)
export class BlockProductionStatsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => BlockProductionStatsNode, { name: 'blockProductionStats' })
  async execute(
    @SelectionSet() selectionSet: SelectionSetObject,
    @Args({
      name: 'id',
      type: () => ID,
      nullable: true,
      description: 'Leave empty to retrieve koin production stats',
    })
    id?: string
  ): Promise<BlockProductionStatsNode> {
    let blockProductionStats: BlockProductionStats;

    if (id) {
      // Get specific production stats
      blockProductionStats = await this.queryBus.execute<
        BlockProductionStatsQuery,
        BlockProductionStats
      >(new BlockProductionStatsQuery(id, selectionSet));
    } else {
      // Get koin production stats as default
      blockProductionStats = await this.queryBus.execute<
        BlockProductionStatsByContractIdQuery,
        BlockProductionStats
      >(
        new BlockProductionStatsByContractIdQuery(
          koinosConfig.contracts.koin,
          selectionSet
        )
      );
    }

    return new BlockProductionStatsNode(blockProductionStats);
  }
}
