import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Block } from '@koiner/chain/domain';
import { BlockHeaderField, BlockReceiptField } from '.';

@ObjectType('Block')
export class BlockNode extends BaseNode {
  @Field()
  id: string;

  @Field(() => BlockHeaderField)
  header: BlockHeaderField;

  @Field()
  signature: string;

  @Field(() => BlockReceiptField)
  receipt: BlockReceiptField;

  @Field(() => Int)
  transactionCount: number;

  constructor(block: Block) {
    super(block);

    this.id = block.id.value;
    this.header = new BlockHeaderField(block.header);
    this.signature = block.signature;
    this.receipt = new BlockReceiptField(block.receipt);
    this.transactionCount = block.transactionCount;
  }
}
