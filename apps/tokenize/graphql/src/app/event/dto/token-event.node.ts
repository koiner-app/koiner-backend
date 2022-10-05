import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenEvent } from '@koiner/tokenize/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('TokenEvent')
export class TokenEventNode extends BaseNode {
  @Field({ nullable: true })
  contractId?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  from?: string;

  @Field({ nullable: true })
  to?: string;

  @Field(() => GraphQLBigInt)
  value: number;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  constructor(event: TokenEvent) {
    super(event);

    this.contractId = event.contractId ? event.contractId.value : undefined;
    this.name = event.name;
    this.from = event.from ? event.from.value : undefined;
    this.to = event.to ? event.to.value : undefined;
    this.value = event.value;
    this.timestamp = event.timestamp;
  }
}
