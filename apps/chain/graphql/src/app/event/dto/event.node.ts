import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Event } from '@koiner/chain/domain';

@ObjectType('Event')
export class EventNode extends BaseNode {
  @Field()
  transactionId: string;

  @Field()
  sequence: number;

  @Field({ nullable: true })
  contractId?: string;

  @Field()
  name: string;

  @Field()
  data: string;

  @Field(() => [String], { nullable: true })
  impacted?: string[];

  constructor(event: Event) {
    super(event);

    this.transactionId = event.transactionId.value;
    this.sequence = event.sequence;
    this.contractId = event.contractId ? event.contractId.value : undefined;
    this.name = event.name;
    this.data = event.data;
    this.impacted = event.impacted
      ? event.impacted.map((address) => address.value)
      : undefined;
  }
}
