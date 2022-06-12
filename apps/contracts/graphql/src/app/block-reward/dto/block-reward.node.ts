import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { BlockReward } from '@koiner/contracts/domain';

@ObjectType('BlockReward')
export class BlockRewardNode extends BaseNode {
  @Field()
  blockHeight: number;

  @Field()
  height: number;

  @Field()
  producerId: string;

  @Field()
  value: number;

  @Field()
  contractId: string;

  constructor(blockReward: BlockReward) {
    super(blockReward);

    this.height = blockReward.blockHeight;
    this.blockHeight = blockReward.blockHeight;
    this.producerId = blockReward.producerId.value;
    this.value = blockReward.value;
    this.contractId = blockReward.contractId.value;
  }
}
