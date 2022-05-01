import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { OperationNode } from './operation.node';

@ObjectType()
export class OperationsConnection extends Connection(OperationNode) {}
