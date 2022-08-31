import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Operation, OperationType } from '@koiner/chain/domain';
import { OperationDetailsUnion } from '.';

@ObjectType('Operation')
export class OperationNode extends BaseNode {
  @Field()
  index: number;

  @Field(() => OperationType)
  type: OperationType;

  @Field()
  blockHeight: number;

  @Field()
  transactionId: string;

  @Field()
  timestamp: number;

  @Field(() => OperationDetailsUnion, { nullable: true })
  details: typeof OperationDetailsUnion;

  constructor(operation: Operation) {
    super(operation);

    this.index = operation.operationIndex;
    this.type = operation.type;
    this.blockHeight = operation.blockHeight;
    this.transactionId = operation.transactionId.value;
    this.timestamp = operation.timestamp;
  }
}
