import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnChainCheckerModule, KoinosModule } from '@koinos/jsonrpc';

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

import { TokenizeModuleApplicationHandlers } from '@koiner/tokenize/application';
import {
  TokenizeModels,
  TokenizeModuleRepositories,
} from '@koiner/tokenize/typeorm';
import { TokenizeModuleGraphQLServices } from './index';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...TokenizeModels);

@Module({
  imports: [
    AmqpModule,
    CqrsModule,
    TypeOrmModule.forFeature(TokenizeModels),
    KoinosModule,
    OnChainCheckerModule,
  ],
  providers: [
    Logger,
    PubSubEngineProvider('koiner.tokenize'),

    {
      provide: ContractStandardService,
      useClass: ContractStandardKoilibService,
    },
    {
      provide: ContractStandardReadRepository,
      useClass: ContractStandardImReadRepository,
    },

    ...TokenizeModuleApplicationHandlers,
    ...TokenizeModuleRepositories,
    ...TokenizeModuleGraphQLServices,
  ],
})
export class TokenizeModule {}
