import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TokenContractStatistics } from '@koiner/contracts/domain';

@ObjectType('TokenContractStatistics')
export class TokenContractStatisticsField {
  @Field(() => Int)
  holderCount: number;

  @Field(() => Int)
  operationCount: number;

  @Field(() => Int)
  mintCount: number;

  @Field(() => Int)
  transferCount: number;

  constructor(stats: TokenContractStatistics) {
    this.holderCount = stats.holderCount;
    this.operationCount = stats.operationCount;
    this.mintCount = stats.mintCount;
    this.transferCount = stats.transferCount;
  }
}
