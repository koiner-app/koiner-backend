import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { GlobalAppModule } from './global.module';
import { ChainModule } from './chain.module';
import { ChainSyncModule } from './chain-sync.module';
import { HealthController } from './health.controller';

import * as config from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    ScheduleModule.forRoot(),
    GlobalAppModule,
    ChainModule,
    ChainSyncModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
