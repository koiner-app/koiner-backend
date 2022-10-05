import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { ContractStandardType } from '@koiner/contracts/standards';
import { Contract } from '@koiner/contracts/domain';
import { GraphQLBigInt } from 'graphql-scalars';

@ObjectType('Contract')
export class ContractNode extends BaseNode {
  @Field({ nullable: true })
  abi: string;

  @Field(() => ContractStandardType, { nullable: true })
  contractStandardType: ContractStandardType;

  @Field(() => GraphQLBigInt)
  timestamp: number;

  constructor(contract: Contract) {
    super(contract);

    this.abi = contract.abi;
    this.contractStandardType = contract.contractStandardType;
    this.timestamp = contract.timestamp;
  }
}
