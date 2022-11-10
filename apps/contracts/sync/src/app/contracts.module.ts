import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlocksServiceModule, KoinosModule } from '@koinos/jsonrpc';
import { ContractStandardKoilibService } from '@koiner/contracts/koilib'; // Must be imported before ContractStandardService
import { ContractStandardImReadRepository } from '@koiner/contracts/koilib';
import {
  ContractStandardReadRepository,
  ContractStandardService,
} from '@koiner/contracts/standards';
import { ContractsModuleApplicationHandlers } from '@koiner/contracts/application';
import {
  ContractsModels,
  ContractsModuleRepositories,
} from '@koiner/contracts/typeorm';

// Register our models with typeorm
import { database } from '../config';
database.entities.push(...ContractsModels);

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(ContractsModels),
    KoinosModule,
    BlocksServiceModule,
  ],
  providers: [
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
  ],
  exports: [ContractStandardService],
})
export class ContractsModule {}
