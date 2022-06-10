import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { GlobalAppModule } from '@koiner/nestjs-utils';
import { ChainModule } from './chain.module';

import * as config from '../config';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    GlobalAppModule,
    ChainModule,
  ],
})
export class AppModule {}
