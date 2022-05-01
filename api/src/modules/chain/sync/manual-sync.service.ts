import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Provider } from 'koilib';
import { SyncBlocksCommand } from '@koiner/chain/sync/application/command';
import {
  CreateChainCommand,
  UpdateChainCommand,
} from '@koiner/chain/application/chain/command';
import { ChainQuery } from '@koiner/chain/application/chain/query';
import { Block, Chain } from '@koiner/chain/domain';
import {
  DateVO,
  NotFoundException,
  SearchResponse,
  SortDirection,
} from '@appvise/domain';
import { BlocksQuery } from '@koiner/chain/application/block/query';
import { koinos } from '@config';

@Injectable()
export class ManualSyncService {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly provider: Provider,
    private readonly logger: Logger,
  ) {}

  async sync(batchSize?: number) {
    this.logger.log('Start syncing!');

    let chain: Chain | undefined;
    let headInfo;
    batchSize = batchSize ?? koinos.batchSize;

    try {
      chain = await this.queryBus.execute<ChainQuery, Chain>(
        new ChainQuery(koinos.chainId),
      );
    } catch (error: any) {
      // Create Chain if not yet already created
      if (error instanceof NotFoundException) {
        headInfo = await this.provider.getHeadInfo();

        chain = await this.commandBus.execute(
          new CreateChainCommand(
            koinos.chainId,
            headInfo.head_topology.id,
            headInfo.head_topology.previous,
            parseInt(headInfo.head_topology.height),
            parseInt(headInfo.last_irreversible_block),
            0,
            false,
          ),
        );

        // TODO: Add first block
        // Add 0/first block to match previous foreign key
      }
    }

    if (!chain || chain.syncing || chain.stopped) {
      if (
        chain.updatedAt.value.getTime() >
        DateVO.now().subtract(0, 5).value.getTime()
      ) {
        // Only stop if we are still within timeout window
        console.log('Do not sync');

        return;
      }

      // TODO: Revert last block because it probably failed to be processed
    }

    if (!headInfo) {
      headInfo = await this.provider.getHeadInfo();
    }

    // Update chain info + set syncing flag
    await this.commandBus.execute(
      new UpdateChainCommand(
        koinos.chainId,
        headInfo.head_topology.id,
        headInfo.head_topology.previous,
        parseInt(headInfo.head_topology.height),
        parseInt(headInfo.last_irreversible_block),
        chain.lastSyncedBlock,
        true,
      ),
    );

    const startBlock = parseInt(chain.lastSyncedBlock.toString()) + 1;
    const endBlock = startBlock + (batchSize - 1);

    // Sync next x blocks
    this.logger.log(
      `Start syncing next batch of ${batchSize} blocks, from ${startBlock} to ${endBlock}`,
    );

    await this.commandBus.execute(new SyncBlocksCommand(startBlock, batchSize));

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
        koinos.chainId,
        headInfo.head_topology.id,
        headInfo.head_topology.previous,
        parseInt(headInfo.head_topology.height),
        parseInt(headInfo.last_irreversible_block),
        lastSyncedBlockHeight,
        false,
      ),
    );

    this.logger.log(
      `Done syncing batch of ${batchSize} blocks, from ${startBlock} to ${lastSyncedBlockHeight}`,
    );
  }
}
