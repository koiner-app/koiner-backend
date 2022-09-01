import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Provider } from 'koilib';
import { Block, Chain } from '@koiner/chain/domain';
import {
  NotFoundException,
  SearchResponse,
  SortDirection,
} from '@appvise/domain';
import {
  BlocksQuery,
  ChainQuery,
  CompleteInitialSyncCommand,
  CreateChainCommand,
  UpdateChainCommand,
} from '@koiner/chain/application';
import { SyncBlocksCommand } from './application';
import { koinos } from '../config';

@Injectable()
export class ManualSyncService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
    private readonly logger: Logger
  ) {}

  async sync(batchSize?: number) {
    this.logger.log('Start syncing!');

    let chain: Chain | undefined;
    let headInfo;
    batchSize = batchSize ?? koinos.batchSize;

    try {
      chain = await this.queryBus.execute<ChainQuery, Chain>(
        new ChainQuery(koinos.chainId)
      );
    } catch (error: any) {
      // Create Chain if not yet already created
      if (error instanceof NotFoundException) {
        headInfo = await this.provider.getHeadInfo();

        chain = await this.commandBus.execute(
          new CreateChainCommand({
            id: koinos.chainId,
            headTopology: {
              id: headInfo.head_topology.id,
              previous: headInfo.head_topology.previous,
              height: parseInt(headInfo.head_topology.height),
            },
            lastIrreversibleBlock: parseInt(headInfo.last_irreversible_block),
            lastSyncedBlock: 0,
            syncing: false,
            initialSyncEndBlock: parseInt(headInfo.head_topology.height),
          })
        );
      }
    }

    if (!chain || chain.syncing || chain.stopped) {
      console.log('Do not sync');

      return;
    }

    if (chain.initialSyncCompleted && process.env.INIT_SYNC === 'active') {
      this.logger.log('Do not sync. Already completed initial sync');

      return;
    }

    if (
      process.env.INIT_SYNC === 'active' &&
      !chain.initialSyncCompleted &&
      chain.initialSyncEndBlock !== chain.lastSyncedBlock &&
      chain.initialSyncEndBlock - chain.lastSyncedBlock < batchSize
    ) {
      this.logger.log(`Initial sync almost completed!`);

      this.logger.log(`BatchSize: ${batchSize}`);
      this.logger.log(`initialSyncEndBlock: ${chain.initialSyncEndBlock}`);
      this.logger.log(`lastSyncedBlock: ${chain.lastSyncedBlock}`);
      this.logger.log(
        `Calc: ${chain.initialSyncEndBlock - chain.lastSyncedBlock}`
      );

      // Blocks to go is smaller than batchSize. Only sync remaining blocks
      batchSize = chain.initialSyncEndBlock - chain.lastSyncedBlock;

      this.logger.log(
        `Initial sync almost completed! Go sync last batch of ${batchSize} blocks.`
      );
    }

    if (
      process.env.INIT_SYNC === 'active' &&
      !chain.initialSyncCompleted &&
      chain.initialSyncEndBlock === chain.lastSyncedBlock
    ) {
      this.logger.log(
        `Initial sync completed! Synced ${chain.lastSyncedBlock} blocks.`
      );

      await this.commandBus.execute(
        new CompleteInitialSyncCommand({
          id: koinos.chainId,
        })
      );

      return;
    }

    if (!headInfo) {
      headInfo = await this.provider.getHeadInfo();
    }

    // Update chain info + set syncing flag
    await this.commandBus.execute(
      new UpdateChainCommand({
        id: koinos.chainId,
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
      new SyncBlocksCommand({
        startHeight,
        amount: batchSize,
      })
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
      })
    );

    const lastSyncedBlockHeight = highestBlock.results[0].item.header.height;

    await this.commandBus.execute(
      new UpdateChainCommand({
        id: koinos.chainId,
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
