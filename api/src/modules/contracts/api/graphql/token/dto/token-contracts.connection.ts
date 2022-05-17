import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { TokenContractNode } from '.';

@ObjectType()
export class TokenContractsConnection extends Connection(TokenContractNode) {}
