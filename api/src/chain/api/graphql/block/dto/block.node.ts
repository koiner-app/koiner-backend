import { Field, ObjectType } from '@nestjs/graphql';
import { Block } from '@koiner/chain/domain';
import { BaseNode } from '@appvise/graphql';
import { BlockHeaderField } from '@koiner/chain/api/graphql/block/dto/block-header.field';
import { TransactionsConnection } from '@koiner/chain/api/graphql/transaction/dto/transactions.connection';

@ObjectType('Block')
export class BlockNode extends BaseNode {
  @Field((type) => BlockHeaderField)
  header: BlockHeaderField;

  @Field()
  signature: string;

  @Field()
  transactionCount: number;

  @Field((type) => TransactionsConnection)
  transactions: TransactionsConnection;

  constructor(entity: Block) {
    super(entity);

    this.header = new BlockHeaderField(entity.header);
    this.signature = entity.signature;
    this.transactionCount = entity.transactionCount;
  }
}
