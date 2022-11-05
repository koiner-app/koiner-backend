import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PubSubEngineProvider } from '@koiner/nestjs-utils';
import { AmqpModule } from '../amqp.module';
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
    AmqpModule,
    CqrsModule,
    TypeOrmModule.forFeature(ChainModuleModels),
  ],
  providers: [
    PubSubEngineProvider('koiner.chain'),
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
