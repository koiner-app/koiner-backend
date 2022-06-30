import { Field, ObjectType } from '@nestjs/graphql';
import { ContractOperationNode } from '.';

@ObjectType('ContractOperationBulkResult')
export class ContractOperationBulkResult {
  @Field(() => ContractOperationNode, { nullable: true })
  item?: ContractOperationNode;

  constructor(contractNode?: ContractOperationNode) {
    if (contractNode) {
      this.item = contractNode;
    }
  }
}
