import { Field, ObjectType } from '@nestjs/graphql';
import { Transaction } from '@koiner/chain/domain';
import { BaseNode } from '@appvise/graphql';
import { TransactionHeaderField } from '@koiner/chain/api/graphql/transaction/dto/transaction-header.field';

@ObjectType('Transaction')
export class TransactionNode extends BaseNode {
  @Field()
  blockHeight: number;

  @Field((type) => TransactionHeaderField)
  header: TransactionHeaderField;

  @Field()
  signature: string;

  @Field()
  operationCount: number;

  @Field()
  index: number;

  constructor(entity: Transaction) {
    super(entity);

    this.blockHeight = entity.blockHeight;
    this.header = new TransactionHeaderField(entity.header);
    this.signature = entity.signature;
    this.operationCount = entity.operationCount;
    this.index = entity.index;
  }
}
