import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { OperationType, SystemCallOperation } from '@koiner/chain/domain';

@ObjectType('SystemCallOperation')
export class SystemCallOperationNode extends BaseNode {
  @Field()
  contractId: string;

  @Field(() => Int)
  callId: number;

  // Used by UnionTypeResolver
  type: OperationType = OperationType.systemCall;

  constructor(operation: SystemCallOperation) {
    super(operation);

    this.contractId = operation.contractId.value;
    this.callId = operation.callId;
  }
}
