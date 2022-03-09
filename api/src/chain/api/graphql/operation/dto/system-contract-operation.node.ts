import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { OperationType, SystemContractOperation } from '@koiner/chain/domain';

@ObjectType('SystemContractOperation')
export class SystemContractOperationNode extends BaseNode {
  @Field()
  contractId: string;

  @Field()
  systemContract: boolean;

  // Used by UnionTypeResolver
  type: OperationType = OperationType.systemContractOperation;

  constructor(entity: SystemContractOperation) {
    super(entity);

    this.contractId = entity.contractId.value;
    this.systemContract = entity.systemContract;
  }
}
