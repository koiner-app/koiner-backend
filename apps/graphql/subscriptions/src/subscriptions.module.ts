import { Module } from '@nestjs/common';
import { AmqpModule } from './amqp.module';
import { CqrsModule } from '@nestjs/cqrs';
import { PubSubEngineProvider } from './pubsub-engine-provider';
import { SubscriptionPublishers } from './publishers';
import { GraphQLSubscriptions } from './subscriptions';

@Module({
  imports: [AmqpModule, CqrsModule],
  providers: [
    PubSubEngineProvider,
    ...SubscriptionPublishers,
    ...GraphQLSubscriptions,
  ],
})
export class SubscriptionsModule {}
