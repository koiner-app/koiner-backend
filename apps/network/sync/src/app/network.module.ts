import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalAppModule } from '@koiner/nestjs-utils';
import { KoinosModule } from '@koinos/jsonrpc';
import { ContractStandardKoilibService } from '@koiner/contracts/koilib'; // Must be imported before ContractStandardService
import { ContractStandardImReadRepository } from '@koiner/contracts/koilib';
import {
  ContractStandardReadRepository,
  ContractStandardService,
} from '@koiner/contracts/standards';
import { NetworkModuleApplicationHandlers } from '@koiner/network/application';
import {
  NetworkModels,
  NetworkModuleRepositories,
} from '@koiner/network/typeorm';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...NetworkModels);

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(NetworkModels),
    GlobalAppModule,
    KoinosModule,
  ],
  providers: [
    {
      provide: ContractStandardService,
      useClass: ContractStandardKoilibService,
    },

    ...NetworkModuleApplicationHandlers,
    ...NetworkModuleRepositories,
    {
      provide: ContractStandardReadRepository,
      useClass: ContractStandardImReadRepository,
    },
  ],
  exports: [ContractStandardService],
})
export class NetworkModule {}
