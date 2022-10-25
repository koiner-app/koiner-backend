import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenStats } from '@koiner/tokenize/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('Chain')
export class TokenStatsNode extends BaseNode {
  @Field(() => GraphQLBigInt)
  contractCount: number;

  @Field(() => GraphQLBigInt)
  transferCount: number;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  constructor(tokenStats: TokenStats) {
    super(tokenStats);

    this.contractCount = tokenStats.contractCount;
    this.transferCount = tokenStats.transferCount;
  }
}
