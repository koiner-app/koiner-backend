import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koiner/koinos.module';
import ChainApplication from '@koiner/chain/application';
import GraphQLResolvers from '@koiner/chain/api/graphql';

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
})
export class ChainModule {}
