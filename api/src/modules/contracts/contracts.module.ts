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
import { ContractsModels, ContractsRepositories } from './persistence/typeorm';
import {
  ContractsModuleGraphQLServices,
  ContractOperationTypeResolver,
  BlockRewardsLoader,
} from './api/graphql';

// Register our models with typeorm
import { database } from '@config';
database.entities.push(...ContractsModels);

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(ContractsModels),
    KoinosModule,
  ],
  providers: [
    Logger,

    {
      provide: ContractStandardService,
      useClass: ContractStandardKoilibService,
    },

    ...ContractsApplicationHandlers,
    ...ContractsRepositories,
    {
      provide: ContractStandardReadRepository,
      useClass: ContractStandardImReadRepository,
    },
    ...ContractsModuleGraphQLServices,
  ],
  exports: [
    BlockRewardsLoader,
    ContractStandardService,
    ContractOperationTypeResolver,
  ],
})
export class ContractsModule {}
