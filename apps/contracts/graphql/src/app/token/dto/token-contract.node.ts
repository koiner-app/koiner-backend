import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenContract } from '@koiner/contracts/domain';
import { TokenContractStatisticsField } from './token-contract-statistics.field';

@ObjectType('TokenContract')
export class TokenContractNode extends BaseNode {
  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field()
  decimals: number;

  @Field()
  totalSupply: number;

  @Field(() => TokenContractStatisticsField)
  stats: TokenContractStatisticsField;

  constructor(tokenContract: TokenContract) {
    super(tokenContract);

    this.name = tokenContract.name;
    this.symbol = tokenContract.symbol;
    this.decimals = tokenContract.decimals;
    this.totalSupply = tokenContract.totalSupply;

    this.stats = new TokenContractStatisticsField(tokenContract.stats);
  }
}
