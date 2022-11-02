import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenEvent } from '@koiner/tokenize/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('TokenEvent')
export class TokenEventNode extends BaseNode {
  @Field(() => GraphQLBigInt)
  blockHeight: number;

  @Field()
  parentId: string;

  @Field()
  parentType: string;

  @Field(() => Int, { nullable: true })
  sequence?: number;

  @Field({ nullable: true })
  contractId?: string;

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

  constructor(tokenEvent: TokenEvent) {
    super(tokenEvent);

    this.blockHeight = tokenEvent.blockHeight;
    this.parentId = tokenEvent.parentId.value;
    this.parentType = tokenEvent.parentType;
    this.sequence = tokenEvent.sequence;
    this.contractId = tokenEvent.contractId
      ? tokenEvent.contractId.value
      : undefined;
    this.name = tokenEvent.name;
    this.from = tokenEvent.from ? tokenEvent.from.value : undefined;
    this.to = tokenEvent.to ? tokenEvent.to.value : undefined;
    this.value = tokenEvent.value.toString();
    this.timestamp = tokenEvent.timestamp;
  }
}
