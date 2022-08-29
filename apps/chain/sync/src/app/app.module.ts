import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AmqpModule } from './amqp.module';
import { GlobalAppModule } from '@koiner/nestjs-utils';
import { ChainModule } from './chain.module';
import { ChainSyncModule } from './chain-sync.module';

import * as config from '../config';

@Module({
  imports: [
    AmqpModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(config.database),
    ScheduleModule.forRoot(),
    GlobalAppModule,
    ChainModule,
    ChainSyncModule,
  ],
})
export class AppModule {}
