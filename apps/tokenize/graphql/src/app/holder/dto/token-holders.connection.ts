import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { TokenHolderNode } from '.';

@ObjectType()
export class TokenHoldersConnection extends Connection(TokenHolderNode) {}
