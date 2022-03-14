import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule } from '@koiner/koinos.module';
import WorkersApplication from '@koiner/workers/application';
import { SyncBlocksWorker } from '@koiner/workers/sync-blocks.worker';
import { ContractsModule } from '@koiner/contracts/contracts.module';

@Module({
  imports: [CqrsModule, ScheduleModule, KoinosModule, ContractsModule],
  providers: [
    SyncBlocksWorker,

    // Application
    ...WorkersApplication,
  ],
  exports: [SyncBlocksWorker],
})
export class WorkersModule {}
