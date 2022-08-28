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
  contractId: string;

  @Field()
  value: number;

  @Field({ nullable: true })
  burnedContractId?: string;

  @Field({ nullable: true })
  burnerId?: string;

  @Field({ nullable: true })
  burnedValue?: number;

  @Field({ nullable: true })
  roi?: number;

  constructor(blockReward: BlockReward) {
    super(blockReward);

    this.height = blockReward.blockHeight;
    this.blockHeight = blockReward.blockHeight;
    this.producerId = blockReward.producerId.value;
    this.contractId = blockReward.contractId.value;
    this.value = blockReward.value;
    this.burnedContractId = blockReward.burnedContractId
      ? blockReward.burnedContractId.value
      : undefined;
    this.burnerId = blockReward.burnerId
      ? blockReward.burnerId.value
      : undefined;
    this.burnedValue = blockReward.burnedValue;
    this.roi = blockReward.roi;
  }
}
