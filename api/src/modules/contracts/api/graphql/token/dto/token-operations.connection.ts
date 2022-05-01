import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { TokenOperationNode } from './token-operation.node';

@ObjectType()
export class TokenOperationsConnection extends Connection(TokenOperationNode) {}
