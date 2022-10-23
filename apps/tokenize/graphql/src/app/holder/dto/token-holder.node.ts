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

  @Field()
  burnCount: number;

  @Field()
  mintCount: number;

  @Field()
  transferInCount: number;

  @Field()
  transferOutCount: number;

  constructor(tokenHolder: TokenHolder) {
    super(tokenHolder);

    this.addressId = tokenHolder.addressId.value;
    this.contractId = tokenHolder.contractId.value;
    this.balance = tokenHolder.balance.toString();
    this.burnCount = tokenHolder.burnCount;
    this.mintCount = tokenHolder.mintCount;
    this.transferInCount = tokenHolder.transferInCount;
    this.transferOutCount = tokenHolder.transferOutCount;
  }
}
