import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { ContractStandardType } from '@koiner/contracts/standards';
import { ContractOperation } from '@koiner/contracts/domain';

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

  @Field({ nullable: true })
  args?: string;

  @Field(() => ContractStandardType, { nullable: true })
  contractStandardType: ContractStandardType;

  @Field()
  timestamp: number;

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
