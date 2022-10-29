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

  constructor(event: TokenEvent) {
    super(event);

    this.blockHeight = event.blockHeight;
    this.parentId = event.parentId.value;
    this.parentType = event.parentType;
    this.sequence = event.sequence;
    this.contractId = event.contractId ? event.contractId.value : undefined;
    this.name = event.name;
    this.from = event.from ? event.from.value : undefined;
    this.to = event.to ? event.to.value : undefined;
    this.value = event.value.toString();
    this.timestamp = event.timestamp;
  }
}
