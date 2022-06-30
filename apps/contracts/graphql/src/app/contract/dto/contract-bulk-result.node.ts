import { Field, ObjectType } from '@nestjs/graphql';
import { ContractNode } from '.';

@ObjectType('ContractBulkResult')
export class ContractBulkResult {
  @Field(() => ContractNode, { nullable: true })
  item?: ContractNode;

  constructor(contractNode?: ContractNode) {
    if (contractNode) {
      this.item = contractNode;
    }
  }
}
