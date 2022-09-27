import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { BlockProducer } from '@koiner/network/domain';

@ObjectType('BlockProducer')
export class BlockProducerNode extends BaseNode {
  @Field()
  addressId: string;

  @Field()
  contractId: string;

  @Field()
  balance: number;

  @Field()
  blocksProduced: number;

  constructor(blockProducer: BlockProducer) {
    super(blockProducer);

    this.addressId = blockProducer.addressId.value;
    this.contractId = blockProducer.contractId.value;
    this.balance = blockProducer.balance;
    this.blocksProduced = blockProducer.blocksProduced;
  }
}
