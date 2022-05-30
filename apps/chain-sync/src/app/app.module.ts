import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { GlobalAppModule } from '@koiner/nestjs-utils';
import { ChainModule } from './chain.module';
import { ChainSyncModule } from './chain-sync.module';

import * as config from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    ScheduleModule.forRoot(),
    GlobalAppModule,
    ChainModule,
    ChainSyncModule,
  ],
})
export class AppModule {}
