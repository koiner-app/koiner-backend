import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { BlockProducer } from '@koiner/network/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('BlockProducer')
export class BlockProducerNode extends BaseNode {
  @Field()
  addressId: string;

  @Field()
  contractId: string;

  @Field(() => String)
  balance: string;

  @Field(() => GraphQLBigInt)
  blocksProduced: number;

  @Field(() => GraphQLBigInt)
  lastProducedBlock: number;

  @Field(() => String)
  mintedTotal: string;

  @Field(() => String)
  burnedTotal: string;

  @Field(() => Float)
  roi: number;

  constructor(blockProducer: BlockProducer) {
    super(blockProducer);

    this.addressId = blockProducer.addressId.value;
    this.contractId = blockProducer.contractId.value;
    this.balance = blockProducer.balance.toString();
    this.blocksProduced = blockProducer.blocksProduced;
    this.lastProducedBlock = blockProducer.lastProducedBlock;
    this.mintedTotal = blockProducer.mintedTotal.toString();
    this.burnedTotal = blockProducer.burnedTotal.toString();
    this.roi = blockProducer.roi;
  }
}
