import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koiner/jsonrpc';
import { ChainModuleApplicationHandlers } from '@koiner/chain/application';
import {
  ChainModuleModels,
  ChainModuleRepositories,
} from '@koiner/chain/typeorm';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...ChainModuleModels);

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(ChainModuleModels),
    KoinosModule,
  ],
  providers: [...ChainModuleApplicationHandlers, ...ChainModuleRepositories],
})
export class ChainModule {}
