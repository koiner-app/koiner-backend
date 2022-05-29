import { ObjectType } from '@nestjs/graphql';
import { Connection } from '@appvise/graphql';
import { BlockRewardNode } from '.';

@ObjectType()
export class BlockRewardsConnection extends Connection(BlockRewardNode) {}
