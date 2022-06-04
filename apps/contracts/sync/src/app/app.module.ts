import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalAppModule } from '@koiner/nestjs-utils';
import { ContractsModule } from './contracts.module';
import { ContractsSyncModule } from './contracts-sync.module';

import * as config from '../config';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(config.database),
    GlobalAppModule,
    ContractsModule,
    ContractsSyncModule,
  ],
})
export class AppModule {}
