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
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SyncBlocksWorker {
  private static CHAIN_ID = 'QmeehjqATVaC4ReXxwbw4DQLbEdEAo8SmTBVzZz8s5ZV5F';
  private static batchSize = 100;

  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
  ) {}

  private readonly logger = new Logger(SyncBlocksWorker.name);

  // @Cron(CronExpression.EVERY_10_SECONDS)
  async handleCron() {
    this.logger.debug('Called every 10 seconds');

    let chain: Chain | undefined;
    let headInfo;

    try {
      chain = await this.queryBus.execute<ChainQuery, Chain>(
        new ChainQuery(SyncBlocksWorker.CHAIN_ID),
      );
    } catch (error: any) {
      // Create Chain if not yet already created
      if (error instanceof NotFoundException) {
        headInfo = await this.provider.getHeadInfo();

        chain = await this.commandBus.execute(
          new CreateChainCommand(
            SyncBlocksWorker.CHAIN_ID,
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
        SyncBlocksWorker.CHAIN_ID,
        headInfo.head_topology.id,
        headInfo.head_topology.previous,
        parseInt(headInfo.head_topology.height),
        parseInt(headInfo.last_irreversible_block),
        chain.lastSyncedBlock,
        true,
      ),
    );

    const endBlock =
      parseInt(chain.lastSyncedBlock.toString()) + SyncBlocksWorker.batchSize;

    // Sync next x blocks
    this.logger.debug(
      `Start syncing next batch of ${SyncBlocksWorker.batchSize} blocks, from ${chain.lastSyncedBlock} to ${endBlock}`,
    );

    await this.commandBus.execute(
      new SyncBlocksCommand(
        chain.lastSyncedBlock,
        SyncBlocksWorker.batchSize + 1, // TODO: Fix + 1 count bug
      ),
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
        SyncBlocksWorker.CHAIN_ID,
        headInfo.head_topology.id,
        headInfo.head_topology.previous,
        parseInt(headInfo.head_topology.height),
        parseInt(headInfo.last_irreversible_block),
        lastSyncedBlockHeight,
        false,
      ),
    );

    this.logger.debug(
      `Done syncing batch of ${SyncBlocksWorker.batchSize} blocks, from ${chain.lastSyncedBlock} to ${lastSyncedBlockHeight}`,
    );
  }
}
