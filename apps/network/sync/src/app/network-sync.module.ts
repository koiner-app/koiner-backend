import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmqpModule } from './amqp.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { KoinosModule, RawBlocksService } from '@koinos/jsonrpc';
import { SyncService } from './sync.service';
import { SynchronizationModuleApplicationHandlers } from '@koiner/sync/application';
import {
  SynchronizationModuleModels,
  SynchronizationModuleRepositories,
} from '@koiner/sync/typeorm';
import { NetworkModule } from './network.module';
import { NetworkSyncApplicationHandlers } from './application';
import { NetworkAmqpHandlers } from './amqp';
import { CronSyncController } from './cron-sync.controller';
import { ManualSyncController } from './manual-sync.controller';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...SynchronizationModuleModels);

const CronSyncControllerWrapper = [];

// Activate cron sync by updating CRON_SYNC=active
if (process.env.CRON_SYNC === 'active') {
  CronSyncControllerWrapper.push(CronSyncController);
}

@Module({
  imports: [
    AmqpModule,
    CqrsModule,
    ScheduleModule,
    KoinosModule,
    TypeOrmModule.forFeature(SynchronizationModuleModels),
    NetworkModule,
  ],
  providers: [
    Logger,
    RawBlocksService,

    // Sync module
    ...SynchronizationModuleApplicationHandlers,
    ...SynchronizationModuleRepositories,

    SyncService,
    ...NetworkSyncApplicationHandlers,
    ...NetworkAmqpHandlers,
  ],
  controllers: [...CronSyncControllerWrapper, ManualSyncController],
})
export class NetworkSyncModule {}
