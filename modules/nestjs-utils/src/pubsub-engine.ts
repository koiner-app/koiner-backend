import { Injectable } from '@nestjs/common';
import { AMQPPubSub } from 'graphql-amqp-subscriptions2';

@Injectable()
export class PubSubEngine extends AMQPPubSub {}
