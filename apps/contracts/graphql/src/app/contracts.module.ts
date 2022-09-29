import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koinos/jsonrpc';
import { PubSubEngineProvider } from '@koiner/nestjs-utils';
import { AmqpModule } from '../amqp.module';
import {
  ContractStandardReadRepository,
  ContractStandardService,
} from '@koiner/contracts/standards';
import {
  ContractStandardImReadRepository,
  ContractStandardKoilibService,
} from '@koiner/contracts/koilib';

import { ContractsModuleApplicationHandlers } from '@koiner/contracts/application';
import {
  ContractsModels,
  ContractsModuleRepositories,
} from '@koiner/contracts/typeorm';
import { ContractsModuleGraphQLServices } from './index';

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
    PubSubEngineProvider('koiner.contracts'),

    {
      provide: ContractStandardService,
      useClass: ContractStandardKoilibService,
    },
    {
      provide: ContractStandardReadRepository,
      useClass: ContractStandardImReadRepository,
    },

    ...ContractsModuleApplicationHandlers,
    ...ContractsModuleRepositories,
    ...ContractsModuleGraphQLServices,
  ],
})
export class ContractsModule {}
