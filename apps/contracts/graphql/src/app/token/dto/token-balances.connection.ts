import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { TokenBalanceNode } from '.';

@ObjectType()
export class TokenBalancesConnection extends Connection(TokenBalanceNode) {}
