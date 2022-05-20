import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { EventQuery } from '@koiner/chain/application';
import { EventNode } from '../dto';

@Resolver(() => EventNode)
export class EventResolver extends NodeQuery(EventNode, EventQuery, 'event') {}

export * from './events.resolver';
