import { Injectable } from '@nestjs/common';
import { AMQPPubSub } from 'graphql-amqp-subscriptions';

@Injectable()
export class PubSubEngine extends AMQPPubSub {}
