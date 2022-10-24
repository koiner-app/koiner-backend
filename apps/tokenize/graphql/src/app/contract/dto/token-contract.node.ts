import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenContract } from '@koiner/tokenize/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('TokenContract')
export class TokenContractNode extends BaseNode {
  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field(() => Int)
  decimals: number;

  @Field(() => String)
  totalSupply: string;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  constructor(tokenContract: TokenContract) {
    super(tokenContract);

    this.name = tokenContract.name;
    this.symbol = tokenContract.symbol;
    this.decimals = tokenContract.decimals;
    this.totalSupply = tokenContract.totalSupply.toString();
    this.timestamp = tokenContract.timestamp;
  }
}
