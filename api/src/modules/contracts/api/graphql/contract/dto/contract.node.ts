import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { Contract } from '@koiner/contracts/domain';

@ObjectType('Contract')
export class ContractNode extends BaseNode {
  @Field({ nullable: true })
  abi: string;

  constructor(entity: Contract) {
    super(entity);

    this.abi = entity.abi;
  }
}
