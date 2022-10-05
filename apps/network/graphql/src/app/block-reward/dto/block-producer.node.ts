import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { BlockProducer } from '@koiner/network/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('BlockProducer')
export class BlockProducerNode extends BaseNode {
  @Field()
  addressId: string;

  @Field()
  contractId: string;

  @Field(() => GraphQLBigInt)
  balance: number;

  @Field(() => Int)
  blocksProduced: number;

  constructor(blockProducer: BlockProducer) {
    super(blockProducer);

    this.addressId = blockProducer.addressId.value;
    this.contractId = blockProducer.contractId.value;
    this.balance = blockProducer.balance;
    this.blocksProduced = blockProducer.blocksProduced;
  }
}
