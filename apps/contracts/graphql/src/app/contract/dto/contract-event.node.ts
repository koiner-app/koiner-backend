import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { ContractEvent, ContractStandardType } from '@koiner/contracts/domain';

@ObjectType('ContractEvent')
export class ContractEventNode extends BaseNode {
  @Field()
  parentId: string;

  @Field()
  parentType: string;

  @Field({ nullable: true })
  sequence?: number;

  @Field({ nullable: true })
  contractId?: string;

  @Field(() => ContractStandardType, { nullable: true })
  contractStandardType: ContractStandardType;

  @Field()
  name: string;

  @Field({ nullable: true })
  data?: string;

  @Field(() => [String], { nullable: true })
  impacted?: string[];

  @Field()
  timestamp: number;

  constructor(event: ContractEvent) {
    super(event);

    this.parentId = event.parentId.value;
    this.parentType = event.parentType;
    this.sequence = event.sequence;
    this.contractId = event.contractId ? event.contractId.value : undefined;
    this.contractStandardType = event.contractStandardType;
    this.name = event.name;
    this.data = event.data;
    this.impacted = event.impacted
      ? event.impacted.map((address) => address.value)
      : undefined;
    this.timestamp = event.timestamp;
  }
}
