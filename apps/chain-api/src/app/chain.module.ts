import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koiner/jsonrpc';
import {
  SystemCallOperationTypeResolver,
  SystemContractOperationTypeResolver,
  UploadContractOperationTypeResolver,
} from './index';
import { ChainModuleApplicationHandlers } from '@koiner/chain/application';
import {
  ChainModuleModels,
  ChainModuleRepositories,
} from '@koiner/chain/typeorm';
import { ChainModuleGraphQLServices } from './index';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...ChainModuleModels);

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(ChainModuleModels),
    KoinosModule,
  ],
  providers: [
    ...ChainModuleApplicationHandlers,
    ...ChainModuleRepositories,
    ...ChainModuleGraphQLServices,
  ],
  exports: [
    SystemCallOperationTypeResolver,
    SystemContractOperationTypeResolver,
    UploadContractOperationTypeResolver,
  ],
})
export class ChainModule {}
