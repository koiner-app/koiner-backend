import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Address } from '@koiner/chain/domain';

@ObjectType('Address')
export class AddressNode extends BaseNode {
  @Field()
  isProducer: boolean;

  constructor(address: Address) {
    super(address);

    this.isProducer = address.isProducer;
  }
}
