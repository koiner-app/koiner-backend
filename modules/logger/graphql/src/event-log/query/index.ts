import { Resolver } from '@nestjs/graphql';
import { NodeQuery } from '@appvise/graphql';
import { EventLogQuery } from '@koiner/logger/application';
import { EventLogNode } from '../dto';

@Resolver(() => EventLogNode)
export class EventLogResolver extends NodeQuery(
  EventLogNode,
  EventLogQuery,
  'eventLog'
) {}

export * from './event-logs.resolver';
