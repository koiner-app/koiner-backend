import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koinos/koinos.module';
import { ContractStandardKoilibService } from '@koiner/contracts/infrastructure/contract-standard/contract-standard-koilib-service'; // Must be imported before ContractStandardService
import { ContractStandardImReadRepository } from '@koiner/contracts/infrastructure/contract-standard/contract-standard-im-read-repository';
import { ContractStandardReadRepository } from '@koiner/contracts/domain';
import {
  ContractStandardService,
  ContractsApplicationHandlers,
} from './application';
import {
  ContractsModuleModels,
  ContractsModuleRepositories,
} from './persistence/typeorm';
import {
  ContractsModuleGraphQLServices,
  ContractOperationTypeResolver,
} from './api/graphql';

// Register our models with typeorm
import { database } from '@config';
database.entities.push(...ContractsModuleModels);

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(ContractsModuleModels),
    KoinosModule,
  ],
  providers: [
    Logger,

    {
      provide: ContractStandardService,
      useClass: ContractStandardKoilibService,
    },

    ...ContractsApplicationHandlers,
    ...ContractsModuleRepositories,
    {
      provide: ContractStandardReadRepository,
      useClass: ContractStandardImReadRepository,
    },
    ...ContractsModuleGraphQLServices,
  ],
  exports: [ContractStandardService, ContractOperationTypeResolver],
})
export class ContractsModule {}
