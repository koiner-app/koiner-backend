import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AmqpModule } from './amqp.module';
import { GlobalAppModule } from '@koiner/nestjs-utils';
import { NetworkModule } from './network.module';
import { NetworkSyncModule } from './network-sync.module';
import { LoggerModule } from './logger.module';

import * as config from '../config';

@Module({
  imports: [
    AmqpModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot(config.database),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      introspection: true,
      playground: false,
      cache: 'bounded',
    }),
    ScheduleModule.forRoot(),
    GlobalAppModule,
    NetworkModule,
    NetworkSyncModule,
    LoggerModule,
  ],
})
export class AppModule {}
