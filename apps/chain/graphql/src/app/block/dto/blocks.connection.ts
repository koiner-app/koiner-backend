import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { BlockNode } from '.';

@ObjectType()
export class BlocksConnection extends Connection(BlockNode) {}
