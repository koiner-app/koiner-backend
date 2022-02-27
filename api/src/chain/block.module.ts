import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import BlockApplication from '@koiner/chain/application';
import GraphQLResolvers from '@koiner/chain/api/graphql';

// Register our models with typeorm
import { database } from '@config';
import SchemaModels from '@koiner/chain/persistence/typeorm/models';
import Repositories from '@koiner/chain/persistence/typeorm/repositories';
database.entities.push(...SchemaModels);

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature(SchemaModels)],
  providers: [
    // Domain
    //

    // Application
    ...BlockApplication,

    // Infrastructure
    //

    ...Repositories,

    // API
    ...GraphQLResolvers,
  ],
})
export class BlockModule {}
