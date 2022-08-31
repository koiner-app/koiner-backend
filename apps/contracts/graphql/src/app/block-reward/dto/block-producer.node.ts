import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { BlockProducer } from '@koiner/contracts/domain';

@ObjectType('BlockProducer')
export class BlockProducerNode extends BaseNode {
  @Field()
  addressId: string;

  @Field()
  contractId: string;

  @Field()
  balance: number;

  constructor(blockProducer: BlockProducer) {
    super(blockProducer);

    this.addressId = blockProducer.addressId.value;
    this.contractId = blockProducer.contractId.value;
    this.balance = blockProducer.balance;
  }
}
