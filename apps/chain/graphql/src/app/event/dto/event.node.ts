import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Event } from '@koiner/chain/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('Event')
export class EventNode extends BaseNode {
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
  data?: string;

  @Field(() => [String], { nullable: true })
  impacted?: string[];

  @Field(() => GraphQLBigInt)
  timestamp: number;

  constructor(event: Event) {
    super(event);

    this.blockHeight = event.blockHeight;
    this.parentId = event.parentId.value;
    this.parentType = event.parentType;
    this.sequence = event.sequence;
    this.contractId = event.contractId ? event.contractId.value : undefined;
    this.name = event.name;
    this.data = event.data;
    this.impacted = event.impacted
      ? event.impacted.map((address) => address.value)
      : undefined;
    this.timestamp = event.timestamp;
  }
}
