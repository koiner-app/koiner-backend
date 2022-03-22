import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ChainModule } from '@koiner/chain/chain.module';

import * as config from '@config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';
import { WorkersModule } from '@koiner/workers/workers.module';
import { ContractsModule } from '@koiner/contracts/contracts.module';

process.env.DB_TYPE = 'postgres';
process.env.DB_NAME = 'test_db';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5432';
process.env.DB_USER = 'root';
process.env.DB_PASSWORD = 'root';

console.log('Known entity types:');
console.log(
  config.database.entities
    .map((constructor) => `- ${constructor.name}`)
    .join('\n'),
);
console.log('');

@Module({
  imports: [
    TypeOrmModule.forRoot(config.database),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: process.env.APP_ENV === 'local' ? './schema.gql' : true,
      path: '/',
      debug: process.env.APP_ENV !== 'prod',
      playground: process.env.APP_ENV !== 'prod',
      context: ({ req }) => ({ req }),
    }),
    ScheduleModule.forRoot(),
    ChainModule,
    ContractsModule,
    WorkersModule,
  ],
})
export class AppModule {}
