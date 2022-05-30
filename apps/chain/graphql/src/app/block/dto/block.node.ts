import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Block } from '@koiner/chain/domain';
import { TransactionsConnection } from '../..';
import { BlockHeaderField, BlockReceiptField } from '.';

@ObjectType('Block')
export class BlockNode extends BaseNode {
  @Field(() => BlockHeaderField)
  header: BlockHeaderField;

  @Field()
  signature: string;

  @Field(() => BlockReceiptField)
  receipt: BlockReceiptField;

  @Field()
  transactionCount: number;

  @Field(() => TransactionsConnection)
  transactions: TransactionsConnection;

  constructor(blockHeader: Block) {
    super(blockHeader);

    this.header = new BlockHeaderField(blockHeader.header);
    this.signature = blockHeader.signature;
    this.receipt = new BlockReceiptField(blockHeader.receipt);
    this.transactionCount = blockHeader.transactionCount;
  }
}
