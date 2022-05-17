import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koinos/koinos.module';
import { GlobalAppModule } from '@koiner/global.module';
import {
  SystemCallOperationTypeResolver,
  SystemContractOperationTypeResolver,
  UploadContractOperationTypeResolver,
} from '@koiner/chain/api/graphql';
import { ChainModuleApplicationHandlers } from '@koiner/chain/application';
import { ChainModuleGraphQLServices } from '@koiner/chain/api/graphql';
import {
  ChainModuleModels,
  ChainModuleRepositories,
} from './persistence/typeorm';

// Register our models with typeorm
import { database } from '@config';
database.entities.push(...ChainModuleModels);

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(ChainModuleModels),
    KoinosModule,
    GlobalAppModule,
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
