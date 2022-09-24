import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { TokenEventNode } from '.';

@ObjectType()
export class TokenEventsConnection extends Connection(TokenEventNode) {}
