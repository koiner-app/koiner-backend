import { Field, Int, ObjectType } from '@nestjs/graphql';
import { AddressStatistics } from '@koiner/chain/domain';

@ObjectType('AddressStatistics')
export class AddressStatisticsField {
  @Field(() => Int)
  blockCount: number;

  @Field(() => Int)
  operationCount: number;

  @Field(() => Int)
  transactionCount: number;

  constructor(stats: AddressStatistics) {
    this.blockCount = stats.blockCount;
    this.operationCount = stats.operationCount;
    this.transactionCount = stats.transactionCount;
  }
}
