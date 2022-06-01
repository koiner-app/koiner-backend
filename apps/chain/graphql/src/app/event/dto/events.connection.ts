import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { EventNode } from '.';

@ObjectType()
export class EventsConnection extends Connection(EventNode) {}
