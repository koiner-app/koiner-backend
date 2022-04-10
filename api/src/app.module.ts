import { ConfigModule } from '@nestjs/config';
import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ChainModule } from '@koiner/chain/chain.module';

import * as config from '@config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ScheduleModule } from '@nestjs/schedule';
import { ContractsModule } from '@koiner/contracts/contracts.module';
import { IntegrationModule } from '@koiner/integration/integration.module';
import { SyncModule } from '@koiner/sync/sync.module';

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
    IntegrationModule,
    SyncModule,
  ],
  providers: [Logger],
})
export class AppModule {}
