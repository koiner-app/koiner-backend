import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Address } from '@koiner/chain/domain';

@ObjectType('Address')
export class AddressNode extends BaseNode {
  @Field()
  isProducer: boolean;

  @Field(() => Int)
  timestamp: number;

  constructor(address: Address) {
    super(address);

    this.isProducer = address.isProducer;
    this.timestamp = address.timestamp;
  }
}
