import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { EventLogNode } from '.';

@ObjectType()
export class EventLogsConnection extends Connection(EventLogNode) {}
