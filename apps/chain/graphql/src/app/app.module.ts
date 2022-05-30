import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { GlobalAppModule } from '@koiner/nestjs-utils';
import { ChainModule } from './chain.module';

import * as config from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: true,
    }),
    GlobalAppModule,
    ChainModule,
  ],
})
export class AppModule {}
