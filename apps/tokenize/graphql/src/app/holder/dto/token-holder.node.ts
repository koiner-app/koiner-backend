import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenHolder } from '@koiner/tokenize/domain';

@ObjectType('TokenHolder')
export class TokenHolderNode extends BaseNode {
  @Field()
  addressId: string;

  @Field()
  contractId: string;

  @Field()
  balance: string;

  constructor(tokenHolder: TokenHolder) {
    super(tokenHolder);

    this.addressId = tokenHolder.addressId.value;
    this.contractId = tokenHolder.contractId.value;
    this.balance = tokenHolder.balance.toString();
  }
}
