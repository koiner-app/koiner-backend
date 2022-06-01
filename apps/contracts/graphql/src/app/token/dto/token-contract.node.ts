import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenContract } from '@koiner/contracts/domain';

@ObjectType('TokenContract')
export class TokenContractNode extends BaseNode {
  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field()
  decimals: number;

  constructor(tokenContract: TokenContract) {
    super(tokenContract);

    this.name = tokenContract.name;
    this.symbol = tokenContract.symbol;
    this.decimals = tokenContract.decimals;
  }
}