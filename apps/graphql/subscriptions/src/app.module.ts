import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AmqpModule } from './amqp.module';
import { GlobalAppModule } from '@koiner/nestjs-utils';
import { SubscriptionsModule } from './subscriptions.module';

@Module({
  imports: [
    AmqpModule,
    GlobalAppModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      subscriptions: {
        'graphql-ws': {
          path: '/graphql',
        },
      },
      context: ({ req }) => ({ req }),
    }),
    SubscriptionsModule,
  ],
  providers: [],
})
export class AppModule {}
