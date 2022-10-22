import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TransactionReceipt } from '@koiner/chain/domain';

@ObjectType('TransactionReceipt')
export class TransactionReceiptField {
  @Field()
  payer: string;

  @Field()
  maxPayerRc: string;

  @Field()
  rcLimit: string;

  @Field()
  rcUsed: string;

  @Field()
  diskStorageUsed: string;

  @Field()
  networkBandwidthUsed: string;

  @Field()
  computeBandwidthUsed: string;

  @Field(() => Int)
  eventCount: number;

  @Field()
  reverted: boolean;

  constructor(transactionReceipt: TransactionReceipt) {
    this.payer = transactionReceipt.payer;
    this.maxPayerRc = transactionReceipt.maxPayerRc.toString();
    this.rcLimit = transactionReceipt.rcLimit.toString();
    this.rcUsed = transactionReceipt.rcUsed.toString();
    this.diskStorageUsed = transactionReceipt.diskStorageUsed.toString();
    this.networkBandwidthUsed =
      transactionReceipt.networkBandwidthUsed.toString();
    this.computeBandwidthUsed =
      transactionReceipt.computeBandwidthUsed.toString();
    this.eventCount = transactionReceipt.eventCount;
    this.reverted = transactionReceipt.reverted;
  }
}
