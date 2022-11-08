import { Field, Float, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { BlockReward } from '@koiner/network/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('BlockReward')
export class BlockRewardNode extends BaseNode {
  @Field(() => GraphQLBigInt)
  blockHeight: number;

  @Field(() => GraphQLBigInt)
  height: number;

  @Field()
  producerId: string;

  @Field()
  contractId: string;

  @Field(() => String)
  value: string;

  @Field(() => String)
  mintedValue: string;

  @Field({ nullable: true })
  burnedContractId: string;

  @Field(() => String)
  burnedValue: string;

  @Field(() => Float)
  roi: number;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  constructor(blockReward: BlockReward) {
    super(blockReward);

    this.height = blockReward.blockHeight;
    this.blockHeight = blockReward.blockHeight;
    this.producerId = blockReward.producerId.value;
    this.contractId = blockReward.contractId.value;
    this.value = blockReward.value.toString();
    this.mintedValue = blockReward.mintedValue.toString();
    this.burnedContractId = blockReward.burnedContractId.value;
    this.burnedValue = blockReward.burnedValue.toString();
    this.roi = blockReward.roi;
    this.timestamp = blockReward.timestamp;
  }
}
