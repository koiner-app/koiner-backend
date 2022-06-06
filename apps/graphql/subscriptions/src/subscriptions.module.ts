import { Module } from '@nestjs/common';
import { AmqpModule } from './amqp.module';
import { CqrsModule } from '@nestjs/cqrs';
import { PubSubEngineProvider } from './pubsub-engine-provider';
import { ChainGraphQLSubscriptions } from './chain';

@Module({
  imports: [AmqpModule, CqrsModule],
  providers: [PubSubEngineProvider, ...ChainGraphQLSubscriptions],
})
export class SubscriptionsModule {}
