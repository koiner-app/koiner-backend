import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BlockReceipt } from '@koiner/chain/domain';

@ObjectType('BlockReceipt')
export class BlockReceiptField {
  @Field(() => Int)
  diskStorageUsed: number;

  @Field(() => Int)
  networkBandwidthUsed: number;

  @Field(() => Int)
  computeBandwidthUsed: number;

  @Field(() => Int)
  eventCount: number;

  constructor(blockReceipt: BlockReceipt) {
    this.diskStorageUsed = blockReceipt.diskStorageUsed;
    this.networkBandwidthUsed = blockReceipt.networkBandwidthUsed;
    this.computeBandwidthUsed = blockReceipt.computeBandwidthUsed;
    this.eventCount = blockReceipt.eventCount;
  }
}
