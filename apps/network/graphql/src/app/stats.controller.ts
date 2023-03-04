import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { BlockProductionStatsByContractIdQuery } from '@koiner/network/application';
import { BlockProductionStats } from '@koiner/network/domain';
import { koinosConfig } from '@koinos/jsonrpc';

@Controller()
export class StatsController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('/block-production/stats')
  async blockProductionStats(): Promise<{
    contractId: string;
    rewarded: number;
    producerCount: number;
    blocksProduced: number;
    mintedTotal: number;
    burnedTotal: number;
  }> {
    const blockProductionStats = await this.queryBus.execute<
      BlockProductionStatsByContractIdQuery,
      BlockProductionStats
    >(new BlockProductionStatsByContractIdQuery(koinosConfig.contracts.koin));

    return {
      contractId: blockProductionStats.contractId.value,
      rewarded: blockProductionStats.rewarded,
      producerCount: blockProductionStats.producerCount,
      blocksProduced: blockProductionStats.blocksProduced,
      mintedTotal: blockProductionStats.mintedTotal,
      burnedTotal: blockProductionStats.burnedTotal,
    };
  }
}
