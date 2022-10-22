import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';
import { BaseNode } from '@appvise/graphql';
import { Transaction } from '@koiner/chain/domain';
import { OperationNode } from '../..';
import { TransactionHeaderField, TransactionReceiptField } from '.';

@ObjectType('Transaction')
export class TransactionNode extends BaseNode {
  @Field(() => GraphQLBigInt)
  blockHeight: number;

  @Field(() => TransactionHeaderField)
  header: TransactionHeaderField;

  @Field(() => TransactionReceiptField)
  receipt: TransactionReceiptField;

  @Field(() => [String])
  signatures: string[];

  @Field(() => [OperationNode])
  operations: OperationNode[];

  @Field(() => Int)
  operationCount: number;

  @Field(() => Int)
  index: number;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  constructor(transaction: Transaction) {
    super(transaction);

    this.blockHeight = transaction.blockHeight;
    this.header = new TransactionHeaderField(transaction.header);
    this.receipt = new TransactionReceiptField(transaction.receipt);
    this.signatures = transaction.signatures;
    this.operations = transaction.operations
      ? transaction.operations.map((operation) => new OperationNode(operation))
      : [];
    this.operationCount = transaction.operationCount;
    this.index = transaction.index;
    this.timestamp = transaction.timestamp;
  }
}
