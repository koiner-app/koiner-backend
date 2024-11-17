import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AmqpModule } from './amqp.module';
import { GlobalAppModule } from '@koiner/nestjs-utils';
import { ContractsModule } from './contracts.module';
import { ContractsSyncModule } from './contracts-sync.module';

import * as config from '../config';
import { ManualSyncController } from './manual-sync.controller';

@Module({
  imports: [
    AmqpModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(config.database),
    GlobalAppModule,
    ContractsModule,
    ContractsSyncModule,
  ],
  controllers: [ManualSyncController],
})
export class AppModule {}
