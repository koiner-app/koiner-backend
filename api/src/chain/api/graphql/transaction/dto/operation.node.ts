import { Field, ObjectType } from '@nestjs/graphql';
import { Operation } from '@koiner/chain/domain';
import { BaseNode } from '@appvise/graphql';
import { OperationType } from '@koiner/chain/domain';
import { OperationDetailsUnion } from '@koiner/chain/api/graphql/transaction/dto/operation.union';

@ObjectType('Operation')
export class OperationNode extends BaseNode {
  @Field()
  index: number;

  @Field((type) => OperationType)
  type: OperationType;

  @Field((type) => OperationDetailsUnion)
  details: typeof OperationDetailsUnion;

  constructor(entity: Operation) {
    super(entity);

    this.index = entity.operationIndex;
    this.type = entity.type;
  }
}
