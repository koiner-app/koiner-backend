import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenHolder } from '@koiner/tokenize/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('TokenHolder')
export class TokenHolderNode extends BaseNode {
  @Field()
  addressId: string;

  @Field()
  contractId: string;

  @Field(() => String)
  balance: string;

  @Field(() => GraphQLBigInt)
  burnCount: number;

  @Field(() => GraphQLBigInt)
  mintCount: number;

  @Field(() => GraphQLBigInt)
  transferInCount: number;

  @Field(() => GraphQLBigInt)
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
