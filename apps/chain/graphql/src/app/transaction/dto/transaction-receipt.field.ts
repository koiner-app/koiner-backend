import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';
import { TransactionReceipt } from '@koiner/chain/domain';

@ObjectType('TransactionReceipt')
export class TransactionReceiptField {
  @Field()
  payer: string;

  @Field(() => GraphQLBigInt)
  maxPayerRc: number;

  @Field(() => GraphQLBigInt)
  rcLimit: number;

  @Field(() => GraphQLBigInt)
  rcUsed: number;

  @Field(() => GraphQLBigInt)
  diskStorageUsed: number;

  @Field(() => GraphQLBigInt)
  networkBandwidthUsed: number;

  @Field(() => GraphQLBigInt)
  computeBandwidthUsed: number;

  @Field(() => Int)
  eventCount: number;

  @Field()
  reverted: boolean;

  constructor(transactionReceipt: TransactionReceipt) {
    this.payer = transactionReceipt.payer;
    this.maxPayerRc = transactionReceipt.maxPayerRc;
    this.rcLimit = transactionReceipt.rcLimit;
    this.rcUsed = transactionReceipt.rcUsed;
    this.diskStorageUsed = transactionReceipt.diskStorageUsed;
    this.networkBandwidthUsed = transactionReceipt.networkBandwidthUsed;
    this.computeBandwidthUsed = transactionReceipt.computeBandwidthUsed;
    this.eventCount = transactionReceipt.eventCount;
    this.reverted = transactionReceipt.reverted;
  }
}
