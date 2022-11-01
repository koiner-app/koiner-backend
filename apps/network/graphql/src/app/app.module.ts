import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AmqpModule } from '../amqp.module';
import { GlobalAppModule } from '@koiner/nestjs-utils';
import { NetworkModule } from './network.module';

import * as config from '../config';

@Module({
  imports: [
    AmqpModule,
    TypeOrmModule.forRoot(config.database),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,
      playground: false,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
        },
      },
      cache: 'bounded',
    }),
    GlobalAppModule,
    NetworkModule,
  ],
})
export class AppModule {}
