import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GlobalAppModule } from '@koiner/nestjs-utils';
import { ContractsModule } from './contracts.module';
import { ContractsSyncModule } from './contracts-sync.module';

import * as config from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    GlobalAppModule,
    ContractsModule,
    ContractsSyncModule,
  ],
})
export class AppModule {}
