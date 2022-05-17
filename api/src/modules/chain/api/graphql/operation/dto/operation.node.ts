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

  @Field(() => OperationDetailsUnion, { nullable: true })
  details: typeof OperationDetailsUnion;

  constructor(entity: Operation) {
    super(entity);

    this.index = entity.operationIndex;
    this.type = entity.type;
    this.blockHeight = entity.blockHeight;
    this.transactionId = entity.transactionId.value;
  }
}
