import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { KoinStats } from '@koiner/tokenize/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('KoinStats')
export class KoinStatsNode extends BaseNode {
  @Field(() => Float)
  price: number;

  @Field(() => Float)
  bidPrice: number;

  @Field(() => Float)
  bidQuantity: number;

  @Field(() => Float)
  askPrice: number;

  @Field(() => Float)
  askQuantity: number;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  constructor(koinStats: KoinStats) {
    super(koinStats);

    this.price = koinStats.price;
    this.bidPrice = koinStats.bidPrice;
    this.bidQuantity = koinStats.bidQuantity;
    this.askPrice = koinStats.askPrice;
    this.askQuantity = koinStats.askQuantity;
    this.timestamp = koinStats.timestamp;
  }
}
