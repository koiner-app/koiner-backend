import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule, RawBlocksService } from '@koiner/jsonrpc';
import { ChainSyncApplicationHandlers } from './application';
import { BlockAcceptedHandler } from './event/block-accepted.handler';
import { SyncController } from './sync.controller';
import { ManualSyncService } from './manual-sync.service';
import ChainSyncEventHandlers from './event';

@Module({
  imports: [CqrsModule, ScheduleModule, KoinosModule],
  providers: [
    Logger,

    // Application
    ...ChainSyncApplicationHandlers,

    // EventHandlers
    BlockAcceptedHandler,
    ...ChainSyncEventHandlers,

    RawBlocksService,
    ManualSyncService,
  ],
  controllers: [SyncController],
})
export class ChainSyncModule {}
