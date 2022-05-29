import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
} from '@nestjs/apollo';

import { GlobalAppModule } from '../global.module';
import { ChainModule } from './chain.module';
import { HealthController } from './health.controller';

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
  controllers: [HealthController],
})
export class AppModule {}
