import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { BlockProducerNode } from '.';

@ObjectType()
export class BlockProducersConnection extends Connection(BlockProducerNode) {}
