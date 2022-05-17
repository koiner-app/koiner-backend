import { Field, ObjectType } from '@nestjs/graphql';
import { BlockReceipt } from '@koiner/chain/domain';

@ObjectType('BlockReceipt')
export class BlockReceiptField {
  @Field()
  diskStorageUsed: number;

  @Field()
  networkBandwidthUsed: number;

  @Field()
  computeBandwidthUsed: number;

  @Field()
  eventCount: number;

  constructor(entity: BlockReceipt) {
    this.diskStorageUsed = entity.diskStorageUsed;
    this.networkBandwidthUsed = entity.networkBandwidthUsed;
    this.computeBandwidthUsed = entity.computeBandwidthUsed;
    this.eventCount = entity.eventCount;
  }
}
