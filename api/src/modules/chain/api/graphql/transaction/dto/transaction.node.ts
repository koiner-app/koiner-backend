import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Transaction } from '@koiner/chain/domain';
import { OperationNode } from '@koiner/chain/api/graphql';
import { TransactionHeaderField } from '.';

@ObjectType('Transaction')
export class TransactionNode extends BaseNode {
  @Field()
  blockHeight: number;

  @Field(() => TransactionHeaderField)
  header: TransactionHeaderField;

  @Field()
  signature: string;

  @Field(() => [OperationNode])
  operations: OperationNode[];

  @Field()
  operationCount: number;

  @Field()
  index: number;

  constructor(entity: Transaction) {
    super(entity);

    this.blockHeight = entity.blockHeight;
    this.header = new TransactionHeaderField(entity.header);
    this.signature = entity.signature;
    this.operations = entity.operations
      ? entity.operations.map((operation) => new OperationNode(operation))
      : [];
    this.operationCount = entity.operationCount;
    this.index = entity.index;
  }
}
