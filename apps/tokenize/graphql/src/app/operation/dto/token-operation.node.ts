import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { ContractStandardType } from '@koiner/contracts/standards';
import { TokenOperation } from '@koiner/tokenize/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('TokenOperation')
export class TokenOperationNode extends BaseNode {
  @Field(() => GraphQLBigInt)
  blockHeight: number;

  @Field()
  transactionId: string;

  @Field()
  contractId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  from?: string;

  @Field({ nullable: true })
  to?: string;

  @Field(() => String)
  value: string;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  // Used by UnionTypeResolver
  contractStandardType: ContractStandardType = ContractStandardType.token;

  constructor(tokenOperation: TokenOperation) {
    super(tokenOperation);

    this.blockHeight = tokenOperation.blockHeight;
    this.transactionId = tokenOperation.transactionId.value;
    this.contractId = tokenOperation.contractId.value;
    this.name = tokenOperation.name;
    this.from = tokenOperation.from ? tokenOperation.from.value : undefined;
    this.to = tokenOperation.to ? tokenOperation.to.value : undefined;
    this.value = tokenOperation.value.toString();
    this.timestamp = tokenOperation.timestamp;
  }
}
