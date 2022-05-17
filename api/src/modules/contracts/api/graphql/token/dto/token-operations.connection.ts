import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { TokenOperationNode } from '.';

@ObjectType()
export class TokenOperationsConnection extends Connection(TokenOperationNode) {}
