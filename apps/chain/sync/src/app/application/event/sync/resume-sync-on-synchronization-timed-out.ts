import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Logger, SearchResponse, SortDirection } from '@appvise/domain';
import { ResumeSynchronizationCommand } from '@koiner/sync/application';
import { SynchronizationTimedOut } from '@koiner/sync/domain';
import { BlocksQuery } from '@koiner/chain/application';
import { Block } from '@koiner/chain/domain';

@Injectable()
export class ResumeSyncOnSynchronizationTimedOut {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly logger: Logger
  ) {}

  @OnEvent(SynchronizationTimedOut.eventName, { async: false })
  async handle(event: SynchronizationTimedOut): Promise<void> {
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

    // Sync next x blocks
    this.logger.log(
      `Resume syncing after last synced block ${lastSyncedBlockHeight}`
    );

    await this.commandBus.execute(
      new ResumeSynchronizationCommand({
        chainId: event.aggregateId,
        lastSyncedBlock: lastSyncedBlockHeight,
      })
    );
  }
}
