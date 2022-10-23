import { Field, ObjectType } from '@nestjs/graphql';
import { BlockRewardNode } from './block-reward.node';

@ObjectType('BlockRewardBulkResult')
export class BlockRewardBulkResult {
  @Field(() => BlockRewardNode, { nullable: true })
  item?: BlockRewardNode;

  constructor(blockRewardNode?: BlockRewardNode) {
    if (blockRewardNode) {
      this.item = blockRewardNode;
    }
  }
}
