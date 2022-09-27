import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Provider } from 'koilib';
import { BlockReward } from '@koiner/network/domain';
import { BlockRewardsQuery } from '@koiner/network/application';
import {
  NotFoundException,
  SearchResponse,
  SortDirection,
} from '@appvise/domain';
import { Synchronization } from '@koiner/sync/domain';
import {
  SynchronizationQuery,
  StartSynchronizationCommand,
  UpdateSynchronizationCommand,
} from '@koiner/sync/application';
import { SyncBlockRewardsCommand } from './application';
import { koinos } from '../config';
import { koinosConfig } from '@koinos/jsonrpc';

@Injectable()
export class SyncService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
    private readonly logger: Logger
  ) {}

  async sync(batchSize?: number) {
    this.logger.log('Start syncing!');

    let chain: Synchronization | undefined;
    let headInfo;
    batchSize = batchSize ?? koinos.batchSize;

    try {
      chain = await this.queryBus.execute<
        SynchronizationQuery,
        Synchronization
      >(new SynchronizationQuery(koinosConfig.chainId));
    } catch (error: any) {
      // Create Synchronization if not yet already created
      if (error instanceof NotFoundException) {
        headInfo = await this.provider.getHeadInfo();

        chain = await this.commandBus.execute(
          new StartSynchronizationCommand({
            id: koinosConfig.chainId,
            headTopology: {
              id: headInfo.head_topology.id,
              previous: headInfo.head_topology.previous,
              height: parseInt(headInfo.head_topology.height),
            },
            lastIrreversibleBlock: parseInt(headInfo.last_irreversible_block),
            lastSyncedBlock: 0,
            syncing: false,
          })
        );
      }
    }

    if (!chain || chain.syncing || chain.stopped) {
      console.log('Do not sync');

      return;
    }

    if (!headInfo) {
      headInfo = await this.provider.getHeadInfo();
    }

    // Update chain info + set syncing flag
    await this.commandBus.execute(
      new UpdateSynchronizationCommand({
        id: koinosConfig.chainId,
        headTopology: {
          id: headInfo.head_topology.id,
          previous: headInfo.head_topology.previous,
          height: parseInt(headInfo.head_topology.height),
        },
        lastIrreversibleBlock: parseInt(headInfo.last_irreversible_block),
        lastSyncedBlock: chain.lastSyncedBlock,
        syncing: true,
      })
    );

    const startHeight = parseInt(chain.lastSyncedBlock.toString()) + 1;
    const endBlock = startHeight + (batchSize - 1);

    // Sync next x blocks
    this.logger.log(
      `Start syncing next batch of ${batchSize} blocks, from ${startHeight} to ${endBlock}`
    );

    await this.commandBus.execute(
      new SyncBlockRewardsCommand({
        startHeight,
        amount: batchSize,
      })
    );

    // Get highest synced block
    const highestBlock = await this.queryBus.execute<
      BlockRewardsQuery,
      SearchResponse<BlockReward>
    >(
      new BlockRewardsQuery({
        first: 1,
        sort: [
          {
            field: 'blockHeight',
            direction: SortDirection.desc,
          },
        ],
      })
    );

    const lastSyncedBlockHeight = highestBlock.results[0].item.blockHeight;

    await this.commandBus.execute(
      new UpdateSynchronizationCommand({
        id: koinosConfig.chainId,
        headTopology: {
          id: headInfo.head_topology.id,
          previous: headInfo.head_topology.previous,
          height: parseInt(headInfo.head_topology.height),
        },
        lastIrreversibleBlock: parseInt(headInfo.last_irreversible_block),
        lastSyncedBlock: lastSyncedBlockHeight,
        syncing: false,
      })
    );

    this.logger.log(
      `Done syncing batch of ${batchSize} blocks, from ${startHeight} to ${lastSyncedBlockHeight}`
    );
  }
}
