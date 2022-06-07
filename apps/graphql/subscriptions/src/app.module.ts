import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AmqpModule } from './amqp.module';
import { GlobalAppModule } from '@koiner/nestjs-utils';
import { SubscriptionsModule } from './subscriptions.module';
import { KoinerGatewayDatasource } from './datasources/koiner-gateway-datasource';
import { ApolloGateway, IntrospectAndCompose } from '@apollo/gateway';

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
      context: async ({ ctx, req }) => {
        const gatewayEndpoint =
          process.env.GATEWAY_ENDPOINT || 'http://graphql-gateway:3000/graphql';
        const isProd = process.env.NODE_ENV === 'production';
        let apolloConfig;
        // let schema;

        /**
         * Instantiate an instance of the Gateway
         */
        const gatewayOptions = {
          debug: !isProd,
          supergraphSdl: new IntrospectAndCompose({
            subgraphs: [
              // TODO: Load from config
              { name: 'chain', url: 'http://chain-graphql:3001/graphql' },
              {
                name: 'contracts',
                url: 'http://contracts-graphql:3002/graphql',
              },
            ],
          }),
        };

        const gateway = new ApolloGateway(gatewayOptions);

        // gateway.onSchemaLoadOrUpdate((schemaContext) => {
        //   schema = makeSubscriptionSchema({
        //     gatewaySchema: schemaContext.apiSchema,
        //     typeDefs,
        //     resolvers,
        //   });
        // });

        // For unmanaged federation, we must set a poll interval to query the
        // subgraph services for their schemas to detect a schema change. Polling
        // the running endpoint for these SDLs is fairly blunt approach, so in
        // production, a more computationally efficient approach would be
        // preferable (or managed federation).
        // gateway.experimental_pollInterval = 36000;

        await gateway.load({ ...(apolloConfig && { apollo: apolloConfig }) });

        // Instantiate and initialize the GatewayDataSource subclass
        // (data source methods will be accessible on the `gatewayApi` key)
        const koinerGatewayDataSource = new KoinerGatewayDatasource(
          gatewayEndpoint
        );

        koinerGatewayDataSource.initialize({ context: ctx, cache: undefined });

        // Return the complete context for the request
        return { req, dataSources: { gatewayApi: koinerGatewayDataSource } };
      },
    }),
    SubscriptionsModule,
  ],
})
export class AppModule {}
