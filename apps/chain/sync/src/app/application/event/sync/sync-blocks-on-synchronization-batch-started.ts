import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Logger, SearchResponse, SortDirection } from '@appvise/domain';
import {
  CompleteBatchCommand,
  MarkBatchAsFailedCommand,
} from '@koiner/sync/application';
import { SynchronizationBatchStarted } from '@koiner/sync/domain';
import { BlocksQuery } from '@koiner/chain/application';
import { Block } from '@koiner/chain/domain';
import { SyncBlocksCommand } from '../../command';
import { BlockSyncFailedException } from '../../exception';

@Injectable()
export class SyncBlocksOnSynchronizationBatchStarted {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly logger: Logger
  ) {}

  @OnEvent(SynchronizationBatchStarted.eventName, { async: false })
  async handle(event: SynchronizationBatchStarted): Promise<void> {
    const { startHeight, endHeight, batchSize } = event;

    // Sync next x blocks
    this.logger.log(
      `Start syncing next batch of ${batchSize} blocks, from ${startHeight} to ${endHeight}`
    );

    let lastSyncedBlockHeight: number;
    let failedAtBlock: number | undefined;
    let failedError: any;

    try {
      await this.commandBus.execute(
        new SyncBlocksCommand({
          startHeight,
          amount: batchSize,
        })
      );
    } catch (error) {
      if (error instanceof BlockSyncFailedException) {
        failedAtBlock = error.height;
      }

      failedError = error;
    }

    if (failedAtBlock) {
      lastSyncedBlockHeight = failedAtBlock - 1;
    } else {
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

      lastSyncedBlockHeight = highestBlock.results[0].item.header.height;
    }

    if (failedAtBlock) {
      await this.commandBus.execute(
        new MarkBatchAsFailedCommand({
          id: event.aggregateId,
          failedAtBlock,
          error: JSON.stringify(failedError),
        })
      );
    } else {
      await this.commandBus.execute(
        new CompleteBatchCommand({
          id: event.aggregateId,
          lastSyncedBlock: lastSyncedBlockHeight,
        })
      );
    }
  }
}
