import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koinos/koinos.module';
import ChainApplication from '@koiner/chain/application';
import GraphQLResolvers from '@koiner/chain/api/graphql';
import { SystemCallOperationTypeResolver } from '@koiner/chain/api/graphql/operation/detail-resolver/system-call-operation-type.resolver';
import { SystemContractOperationTypeResolver } from '@koiner/chain/api/graphql/operation/detail-resolver/system-contract-operation-type.resolver';
import { UploadContractOperationTypeResolver } from '@koiner/chain/api/graphql/operation/detail-resolver/upload-contract-operation-type.resolver';

// Register our models with typeorm
import { database } from '@config';
import SchemaModels from '@koiner/chain/persistence/typeorm/models';
import Repositories from '@koiner/chain/persistence/typeorm/repositories';
import { ContractsModule } from '@koiner/contracts/contracts.module';
database.entities.push(...SchemaModels);

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature(SchemaModels),
    KoinosModule,
    ContractsModule,
  ],
  providers: [
    // Domain
    //

    // Application
    ...ChainApplication,

    // Infrastructure
    //

    ...Repositories,

    // API
    ...GraphQLResolvers,
  ],
  exports: [
    SystemCallOperationTypeResolver,
    SystemContractOperationTypeResolver,
    UploadContractOperationTypeResolver,
  ],
})
export class ChainModule {}
