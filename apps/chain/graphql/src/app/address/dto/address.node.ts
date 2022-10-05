import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Address } from '@koiner/chain/domain';

@ObjectType('Address')
export class AddressNode extends BaseNode {
  @Field()
  isProducer: boolean;

  @Field()
  isContract: boolean;

  @Field()
  isTokenContract: boolean;

  @Field(() => Int)
  timestamp: number;

  constructor(address: Address) {
    super(address);

    this.isProducer = address.isProducer;
    this.isContract = address.isContract;
    this.isTokenContract = address.isTokenContract;
    this.timestamp = address.timestamp;
  }
}
