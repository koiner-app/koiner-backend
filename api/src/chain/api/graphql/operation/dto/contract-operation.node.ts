import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { ContractOperation, OperationType } from '@koiner/chain/domain';
import { ContractOperationDetailsUnion } from '@koiner/contracts/api/graphql/contract/dto/contract-operation.union';
import { ContractStandardType } from '@koiner/contracts/domain';

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

  @Field(() => ContractStandardType, { nullable: true })
  contractStandardType: ContractStandardType;

  @Field(() => ContractOperationDetailsUnion)
  details: typeof ContractOperationDetailsUnion;

  constructor(entity: ContractOperation) {
    super(entity);

    this.contractId = entity.contractId.value;
    this.entryPoint = entity.entryPoint;
    this.args = entity.args;
    this.contractStandardType =
      entity.contractStandardType as ContractStandardType;
  }
}
