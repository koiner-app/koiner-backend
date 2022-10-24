import { Field, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';
import { ChainStats } from '@koiner/chain/domain';

@ObjectType('ChainStats')
export class ChainStatsField {
  @Field(() => GraphQLBigInt)
  addressCount: number;

  @Field(() => GraphQLBigInt)
  operationCount: number;

  @Field(() => GraphQLBigInt)
  transactionCount: number;

  constructor(stats: ChainStats) {
    this.addressCount = stats.addressCount;
    this.operationCount = stats.operationCount;
    this.transactionCount = stats.transactionCount;
  }
}
