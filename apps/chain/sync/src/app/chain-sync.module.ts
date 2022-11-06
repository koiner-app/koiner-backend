import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AmqpModule } from './amqp.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CqrsModule } from '@nestjs/cqrs';
import { BlocksServiceModule } from '@koinos/jsonrpc';
import { SynchronizationModuleApplicationHandlers } from '@koiner/sync/application';
import {
  SynchronizationModuleModels,
  SynchronizationModuleRepositories,
} from '@koiner/sync/typeorm';
import { SynchronizationModuleGraphQLServices } from '@koiner/sync/graphql';
import { ChainSyncApplicationHandlers } from './application';
import { ChainAmqpHandlers } from './amqp';
import { CronSyncController } from './cron-sync.controller';
import { ManualSyncController } from './manual-sync.controller';

import { SyncLoggerModule } from '@koiner/sync/logger';
import { KoinerLoggerModule } from '@koiner/logger/nestjs';
import { LoggerModule } from './logger.module';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...SynchronizationModuleModels);

const CronSyncControllerWrapper = [];

// Activate cron sync by updating SYNC_CRON=active
if (process.env.SYNC_CRON === 'active') {
  CronSyncControllerWrapper.push(CronSyncController);
}

@Module({
  imports: [
    AmqpModule,
    CqrsModule,
    ScheduleModule,
    BlocksServiceModule,
    TypeOrmModule.forFeature(SynchronizationModuleModels),
    SyncLoggerModule,
    KoinerLoggerModule,
    LoggerModule,
  ],
  providers: [
    // Sync module
    ...SynchronizationModuleApplicationHandlers,
    ...SynchronizationModuleRepositories,
    ...SynchronizationModuleGraphQLServices,

    ...ChainSyncApplicationHandlers,
    ...ChainAmqpHandlers,
  ],
  controllers: [...CronSyncControllerWrapper, ManualSyncController],
})
export class ChainSyncModule {}
