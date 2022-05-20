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

  constructor(transaction: Transaction) {
    super(transaction);

    this.blockHeight = transaction.blockHeight;
    this.header = new TransactionHeaderField(transaction.header);
    this.signature = transaction.signature;
    this.operations = transaction.operations
      ? transaction.operations.map((operation) => new OperationNode(operation))
      : [];
    this.operationCount = transaction.operationCount;
    this.index = transaction.index;
  }
}
