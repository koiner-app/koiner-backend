import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenBalance } from '@koiner/contracts/domain';

@ObjectType('TokenBalance')
export class TokenBalanceNode extends BaseNode {
  @Field()
  addressId: string;

  @Field()
  contractId: string;

  @Field()
  balance: number;

  constructor(tokenBalance: TokenBalance) {
    super(tokenBalance);

    this.addressId = tokenBalance.addressId.value;
    this.contractId = tokenBalance.contractId.value;
    this.balance = tokenBalance.balance;
  }
}
