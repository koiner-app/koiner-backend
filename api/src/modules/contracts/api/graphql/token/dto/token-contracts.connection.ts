import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { TokenContractNode } from './token-contract.node';

@ObjectType()
export class TokenContractsConnection extends Connection(TokenContractNode) {}
