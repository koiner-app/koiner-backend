import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Contract, ContractStandardType } from '@koiner/contracts/domain';

@ObjectType('Contract')
export class ContractNode extends BaseNode {
  @Field({ nullable: true })
  abi: string;

  @Field(() => ContractStandardType, { nullable: true })
  contractStandardType: ContractStandardType;

  constructor(contract: Contract) {
    super(contract);

    this.abi = contract.abi;
    this.contractStandardType = contract.contractStandardType;
  }
}
