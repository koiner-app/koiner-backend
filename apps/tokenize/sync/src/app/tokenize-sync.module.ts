import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { HttpModule } from '@nestjs/axios';
import { BlocksServiceModule } from '@koinos/jsonrpc';
import { AmqpModule } from './amqp.module';
import { KoinerLoggerModule } from '@koiner/logger/nestjs';
import { LoggerModule } from './logger.module';
import { TokenizeModule } from './tokenize.module';
import { TokenizeAmqpHandlers } from './amqp';
import { CronSyncKoinStatsController } from './cron-sync-koin-stats.controller';

const CronSyncControllerWrapper = [];

// Activate cron for syncing KoinStats by updating SYNC_KOIN_STATS=active
if (process.env.SYNC_KOIN_STATS === 'active') {
  CronSyncControllerWrapper.push(CronSyncKoinStatsController);
}

@Module({
  imports: [
    AmqpModule,
    CqrsModule,
    HttpModule,
    BlocksServiceModule,
    KoinerLoggerModule,
    LoggerModule,
    TokenizeModule,
  ],
  providers: [...TokenizeAmqpHandlers],
  controllers: [...CronSyncControllerWrapper],
})
export class TokenizeSyncModule {}
