import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BlockReceipt } from '@koiner/chain/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('BlockReceipt')
export class BlockReceiptField {
  @Field(() => GraphQLBigInt)
  diskStorageUsed: number;

  @Field(() => GraphQLBigInt)
  networkBandwidthUsed: number;

  @Field(() => GraphQLBigInt)
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
