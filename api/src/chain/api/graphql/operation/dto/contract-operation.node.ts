import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { ContractOperation, OperationType } from '@koiner/chain/domain';

@ObjectType('ContractOperation')
export class ContractOperationNode extends BaseNode {
  @Field()
  contractId: string;

  @Field()
  entryPoint: number;

  @Field()
  args: string;

  // Used by UnionTypeResolver
  type: OperationType = OperationType.contractOperation;

  constructor(entity: ContractOperation) {
    super(entity);

    this.contractId = entity.contractId.value;
    this.entryPoint = entity.entryPoint;
    this.args = entity.args;
  }
}
