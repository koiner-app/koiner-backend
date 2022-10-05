import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Transaction } from '@koiner/chain/domain';
import { OperationNode } from '../..';
import { TransactionHeaderField } from '.';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('Transaction')
export class TransactionNode extends BaseNode {
  @Field(() => GraphQLBigInt)
  blockHeight: number;

  @Field(() => TransactionHeaderField)
  header: TransactionHeaderField;

  @Field()
  signature: string;

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
    this.signature = transaction.signature;
    this.operations = transaction.operations
      ? transaction.operations.map((operation) => new OperationNode(operation))
      : [];
    this.operationCount = transaction.operationCount;
    this.index = transaction.index;
    this.timestamp = transaction.timestamp;
  }
}
