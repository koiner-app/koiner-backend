import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoinosModule } from '@koiner/koinos.module';
import ContractsApplication from '@koiner/contracts/application';
import GraphQLResolvers from '@koiner/contracts/api/graphql';

// Register our models with typeorm
import { database } from '@config';
import SchemaModels from '@koiner/contracts/persistence/typeorm/models';
import Repositories from '@koiner/contracts/persistence/typeorm/repositories';
database.entities.push(...SchemaModels);

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(SchemaModels), KoinosModule],
  providers: [
    // Domain
    //

    // Application
    ...ContractsApplication,

    // Infrastructure
    //

    ...Repositories,

    // API
    ...GraphQLResolvers,
  ],
  exports: [...Repositories],
})
export class ContractsModule {}
