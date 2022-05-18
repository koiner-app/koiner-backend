import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Block } from '@koiner/chain/domain';
import { TransactionsConnection } from '@koiner/chain/api/graphql';
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

  constructor(entity: Block) {
    super(entity);

    this.header = new BlockHeaderField(entity.header);
    this.signature = entity.signature;
    this.receipt = new BlockReceiptField(entity.receipt);
    this.transactionCount = entity.transactionCount;
  }
}
