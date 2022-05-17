import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import {
  ContractOperation,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { ContractOperationDetailsUnion } from '@koiner/contracts/api/graphql/contract/dto/contract-operation.union';

@ObjectType('ContractOperation')
export class ContractOperationNode extends BaseNode {
  @Field()
  contractId: string;

  @Field()
  transactionId: string;

  @Field()
  entryPoint: number;

  @Field()
  args: string;

  @Field(() => ContractStandardType, { nullable: true })
  contractStandardType: ContractStandardType;

  @Field(() => ContractOperationDetailsUnion, { nullable: true })
  details: typeof ContractOperationDetailsUnion;

  // Used by UnionTypeResolver
  type = 'contractOperation';

  constructor(entity: ContractOperation) {
    super(entity);

    this.contractId = entity.contractId.value;
    this.transactionId = entity.transactionId.value;
    this.entryPoint = entity.entryPoint;
    this.args = entity.args;
    this.contractStandardType =
      entity.contractStandardType as ContractStandardType;
  }
}
