import { Logger, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koinos/koinos.module';
import ContractsApplication from '@koiner/contracts/application';
import GraphQLResolvers from '@koiner/contracts/api/graphql';
import { ContractStandardReadRepository } from '@koiner/contracts/domain';
import { ContractStandardService } from '@koiner/contracts/application/contract-standard/service';
import { ContractStandardKoilibService } from '@koiner/contracts/infrastructure/contract-standard/contract-standard-koilib-service';
import { ContractStandardImReadRepository } from '@koiner/contracts/infrastructure/contract-standard/contract-standard-im-read-repository';

// Register our models with typeorm
import { database } from '@config';
import SchemaModels from '@koiner/contracts/persistence/typeorm/models';
import Repositories from '@koiner/contracts/persistence/typeorm/repositories';
import { CreateTokenContractOnContractCreated } from '@koiner/contracts/application/token/event/create-token-contract-on-contract-created';
import { ContractOperationTypeResolver } from '@koiner/contracts/api/graphql/operation/detail-resolver/contract-operation-type.resolver';
database.entities.push(...SchemaModels);

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(SchemaModels), KoinosModule],
  providers: [
    Logger,

    // Domain
    //

    // Application
    ...ContractsApplication,
    {
      provide: ContractStandardService,
      useClass: ContractStandardKoilibService,
    },

    // Infrastructure
    //

    ...Repositories,
    {
      provide: ContractStandardReadRepository,
      useClass: ContractStandardImReadRepository,
    },

    // API
    ...GraphQLResolvers,
  ],
  exports: [
    ...Repositories,
    ContractStandardService,
    CreateTokenContractOnContractCreated,
    ContractOperationTypeResolver,
  ],
})
export class ContractsModule {}
