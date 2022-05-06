import { Logger, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule } from '@koinos/koinos.module';
import ChainSyncApplication from '@koiner/chain/sync/application';
import { BlockAcceptedHandler } from '@koiner/chain/sync/event/block-accepted.handler';
import { SyncController } from '@koiner/chain/sync/sync.controller';
import { ManualSyncService } from '@koiner/chain/sync/manual-sync.service';
import { RawBlocksService } from '@koinos/raw-blocks.service';
import ChainSyncEventHandlers from '@koiner/chain/sync/event';

@Module({
  imports: [CqrsModule, ScheduleModule, KoinosModule],
  providers: [
    Logger,

    // Application
    ...ChainSyncApplication,

    // EventHandlers
    BlockAcceptedHandler,
    ...ChainSyncEventHandlers,

    RawBlocksService,
    ManualSyncService,
  ],
  controllers: [SyncController],
})
export class ChainSyncModule {}
