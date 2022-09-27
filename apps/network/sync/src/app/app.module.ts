import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { AmqpModule } from './amqp.module';
import { GlobalAppModule } from '@koiner/nestjs-utils';
import { NetworkModule } from './network.module';
import { NetworkSyncModule } from './network-sync.module';

import * as config from '../config';

@Module({
  imports: [
    AmqpModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(config.database),
    ScheduleModule.forRoot(),
    GlobalAppModule,
    NetworkModule,
    NetworkSyncModule,
  ],
})
export class AppModule {}
