import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { BlockRewardBalanceNode } from '.';

@ObjectType()
export class BlockRewardBalancesConnection extends Connection(
  BlockRewardBalanceNode
) {}
