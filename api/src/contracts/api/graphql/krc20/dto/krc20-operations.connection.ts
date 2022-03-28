import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { Krc20OperationNode } from './krc20-operation.node';

@ObjectType()
export class Krc20OperationsConnection extends Connection(Krc20OperationNode) {}
