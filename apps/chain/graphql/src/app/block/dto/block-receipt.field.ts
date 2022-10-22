import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BlockReceipt } from '@koiner/chain/domain';

@ObjectType('BlockReceipt')
export class BlockReceiptField {
  @Field()
  diskStorageUsed: string;

  @Field()
  networkBandwidthUsed: string;

  @Field()
  computeBandwidthUsed: string;

  @Field(() => Int)
  eventCount: number;

  constructor(blockReceipt: BlockReceipt) {
    this.diskStorageUsed = blockReceipt.diskStorageUsed.toString();
    this.networkBandwidthUsed = blockReceipt.networkBandwidthUsed.toString();
    this.computeBandwidthUsed = blockReceipt.computeBandwidthUsed.toString();
    this.eventCount = blockReceipt.eventCount;
  }
}
