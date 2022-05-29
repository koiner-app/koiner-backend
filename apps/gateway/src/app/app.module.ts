import { Module } from '@nestjs/common';
import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

import { HealthController } from './health.controller';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      // server: {
      //   // ... Apollo server options
      //   cors: true,
      // },
      gateway: {
        supergraphSdl: new IntrospectAndCompose({
          subgraphs: [
            // TODO: Load from config
            { name: 'chain', url: 'http://localhost:3001/graphql' },
            { name: 'contracts', url: 'http://localhost:3002/graphql' },
          ],
        }),
      },
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
