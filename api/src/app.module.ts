import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { GlobalModule } from '@koiner/global.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { ChainModule } from '@koiner/chain/chain.module';
import * as config from '@config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';
import { ContractsModule } from '@koiner/contracts/contracts.module';
import { ChainIntegrationModule } from '@koiner/integration/chain/chain-integration.module';
import { ChainSyncModule } from '@koiner/chain/sync/chain-sync.module';
import { ContractsSyncModule } from '@koiner/contracts/sync/contracts-sync.module';

if (process.env.APP_ENV !== 'prod') {
  console.log('Known entity types:');
  console.log(
    config.database.entities
      .map((constructor) => `- ${constructor.name}`)
      .join('\n'),
  );
  console.log('');
}

@Module({
  imports: [
    GlobalModule,

    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(config.database),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: process.env.APP_ENV === 'local' ? './schema.gql' : true,
      path: '/',
      debug: process.env.APP_ENV !== 'prod',
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    ScheduleModule.forRoot(),

    // App modules
    ChainModule,
    ContractsModule,
    ChainIntegrationModule,
    ChainSyncModule,
    ContractsSyncModule,
  ],
})
export class AppModule {}
