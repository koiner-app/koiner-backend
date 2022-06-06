import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Block } from '@koiner/chain/domain';
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

  constructor(block: Block) {
    super(block);

    this.header = new BlockHeaderField(block.header);
    this.signature = block.signature;
    this.receipt = new BlockReceiptField(block.receipt);
    this.transactionCount = block.transactionCount;
  }
}
