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

  constructor(entity: TokenContract) {
    super(entity);

    this.name = entity.name;
    this.symbol = entity.symbol;
    this.decimals = entity.decimals;
  }
}
