import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koinos/jsonrpc';
import { PubSubEngineProvider } from '../pubsub-engine-provider';
import { AmqpModule } from '../amqp.module';
import { ContractStandardKoilibService } from '@koiner/contracts/koilib'; // Must be imported before ContractStandardService
import { ContractStandardImReadRepository } from '@koiner/contracts/koilib';
import { ContractStandardReadRepository } from '@koiner/contracts/domain';
import {
  ContractStandardService,
  ContractsModuleApplicationHandlers,
} from '@koiner/contracts/application';
import {
  ContractsModels,
  ContractsModuleRepositories,
} from '@koiner/contracts/typeorm';
import {
  ContractsModuleGraphQLServices,
  // TODO: Fix
  // ContractOperationTypeResolver,
  BlockRewardsLoader,
} from './index';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...ContractsModels);

@Module({
  imports: [
    AmqpModule,
    CqrsModule,
    TypeOrmModule.forFeature(ContractsModels),
    KoinosModule,
  ],
  providers: [
    Logger,
    PubSubEngineProvider,

    {
      provide: ContractStandardService,
      useClass: ContractStandardKoilibService,
    },

    ...ContractsModuleApplicationHandlers,
    ...ContractsModuleRepositories,
    {
      provide: ContractStandardReadRepository,
      useClass: ContractStandardImReadRepository,
    },
    ...ContractsModuleGraphQLServices,
  ],
  exports: [
    BlockRewardsLoader,
    ContractStandardService,
    // TODO: Fix
    // ContractOperationTypeResolver,
  ],
})
export class ContractsModule {}
