import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Provider } from 'koilib';
import { SyncBlocksCommand } from '@koiner/workers/application/chain/command';
import {
  CreateChainCommand,
  UpdateChainCommand,
} from '@koiner/chain/application/chain/command';
import { ChainQuery } from '@koiner/chain/application/chain/query';
import { Block, Chain } from '@koiner/chain/domain';
import { NotFoundException } from '@appvise/domain';
import { BlocksQuery } from '@koiner/chain/application/block/query';
import { SearchResponse, SortDirection } from '@appvise/search';
import { koinos } from '@config';

@Injectable()
export class SyncBlocksWorker {
  private static batchSize = 2000;

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
  ) {}

  private readonly logger = new Logger(SyncBlocksWorker.name);

  async sync() {
    this.logger.debug('Start syncing');

    let chain: Chain | undefined;
    let headInfo;

    try {
      chain = await this.queryBus.execute<ChainQuery, Chain>(
        new ChainQuery(koinos.mainChainId),
      );
    } catch (error: any) {
      // Create Chain if not yet already created
      if (error instanceof NotFoundException) {
        headInfo = await this.provider.getHeadInfo();

        chain = await this.commandBus.execute(
          new CreateChainCommand(
            koinos.mainChainId,
            headInfo.head_topology.id,
            headInfo.head_topology.previous,
            parseInt(headInfo.head_topology.height),
            parseInt(headInfo.last_irreversible_block),
            0,
            false,
          ),
        );

        // TODO: Add first block
        // Add 0/first block
      }
    }

    if (!chain) {
      console.log('STOP! No chain');
      return;
    }

    if (chain.syncing) {
      console.log('STOP! Already syncing');
      return;
    }

    if (!headInfo) {
      headInfo = await this.provider.getHeadInfo();
    }

    // Update chain info + set syncing flag
    await this.commandBus.execute(
      new UpdateChainCommand(
        koinos.mainChainId,
        headInfo.head_topology.id,
        headInfo.head_topology.previous,
        parseInt(headInfo.head_topology.height),
        parseInt(headInfo.last_irreversible_block),
        chain.lastSyncedBlock,
        true,
      ),
    );

    const startBlock = parseInt(chain.lastSyncedBlock.toString()) + 1;
    const endBlock = startBlock + SyncBlocksWorker.batchSize - 1;

    // Sync next x blocks
    this.logger.debug(
      `Start syncing next batch of ${SyncBlocksWorker.batchSize} blocks, from ${startBlock} to ${endBlock}`,
    );

    await this.commandBus.execute(
      new SyncBlocksCommand(startBlock, SyncBlocksWorker.batchSize),
    );

    // Get highest synced block
    const highestBlock = await this.queryBus.execute<
      BlocksQuery,
      SearchResponse<Block>
    >(
      new BlocksQuery({
        first: 1,
        sort: [
          {
            field: 'height',
            direction: SortDirection.desc,
          },
        ],
      }),
    );

    const lastSyncedBlockHeight = highestBlock.results[0].item.header.height;

    await this.commandBus.execute(
      new UpdateChainCommand(
        koinos.mainChainId,
        headInfo.head_topology.id,
        headInfo.head_topology.previous,
        parseInt(headInfo.head_topology.height),
        parseInt(headInfo.last_irreversible_block),
        lastSyncedBlockHeight,
        false,
      ),
    );

    this.logger.debug(
      `Done syncing batch of ${SyncBlocksWorker.batchSize} blocks, from ${startBlock} to ${lastSyncedBlockHeight}`,
    );
  }
}
