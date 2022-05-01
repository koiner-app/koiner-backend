import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { OperationType, SystemCallOperation } from '@koiner/chain/domain';

@ObjectType('SystemCallOperation')
export class SystemCallOperationNode extends BaseNode {
  @Field()
  contractId: string;

  @Field()
  callId: number;

  // Used by UnionTypeResolver
  type: OperationType = OperationType.systemCall;

  constructor(entity: SystemCallOperation) {
    super(entity);

    this.contractId = entity.contractId.value;
    this.callId = entity.callId;
  }
}
