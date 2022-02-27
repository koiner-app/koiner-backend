import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncBlocksWorker } from '@koiner/workers/sync-blocks.worker';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, ScheduleModule],
  providers: [SyncBlocksWorker],
  exports: [SyncBlocksWorker],
})
export class WorkersModule {}
