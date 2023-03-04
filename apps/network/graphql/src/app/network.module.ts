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

import { NetworkModuleApplicationHandlers } from '@koiner/network/application';
import {
  NetworkModels,
  NetworkModuleRepositories,
} from '@koiner/network/typeorm';
import { NetworkModuleGraphQLServices, BlockRewardsLoader } from './index';

// Register our models with typeorm
import { database } from '../config';
import { StatsController } from './stats.controller';
database.entities.push(...NetworkModels);

@Module({
  imports: [
    AmqpModule,
    CqrsModule,
    TypeOrmModule.forFeature(NetworkModels),
    KoinosModule,
  ],
  providers: [
    Logger,
    PubSubEngineProvider('koiner.network'),

    {
      provide: ContractStandardService,
      useClass: ContractStandardKoilibService,
    },
    {
      provide: ContractStandardReadRepository,
      useClass: ContractStandardImReadRepository,
    },

    ...NetworkModuleApplicationHandlers,
    ...NetworkModuleRepositories,
    ...NetworkModuleGraphQLServices,
  ],
  exports: [BlockRewardsLoader],
  controllers: [StatsController],
})
export class NetworkModule {}
