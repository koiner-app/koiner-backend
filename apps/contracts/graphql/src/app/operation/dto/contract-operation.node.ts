import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import {
  ContractOperation,
  ContractStandardType,
} from '@koiner/contracts/domain';
import { ContractOperationDetailsUnion } from '../../contract/dto/contract-operation.union';

@ObjectType('ContractOperationWithDetails')
export class ContractOperationNode extends BaseNode {
  @Field(() => Int)
  blockHeight: number;

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

  @Field()
  timestamp: number;

  @Field(() => ContractOperationDetailsUnion, { nullable: true })
  details: typeof ContractOperationDetailsUnion;

  // Used by UnionTypeResolver
  type = 'contractOperation';

  constructor(operation: ContractOperation) {
    super(operation);

    this.blockHeight = operation.blockHeight;
    this.contractId = operation.contractId.value;
    this.transactionId = operation.transactionId.value;
    this.entryPoint = operation.entryPoint;
    this.args = operation.args;
    this.contractStandardType =
      operation.contractStandardType as ContractStandardType;
    this.timestamp = operation.timestamp;
  }
}
