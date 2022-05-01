import { Field, ObjectType } from '@nestjs/graphql';
import { Contract } from '@koiner/contracts/domain';
import { BaseNode } from '@appvise/graphql';

@ObjectType('Contract')
export class ContractNode extends BaseNode {
  @Field()
  blockHeight: number;

  @Field()
  transactionId: string;

  @Field()
  operationIndex: number;

  @Field({ nullable: true })
  abi: string;

  constructor(entity: Contract) {
    super(entity);

    this.blockHeight = entity.blockHeight;
    this.transactionId = entity.transactionId.value;
    this.operationIndex = entity.operationIndex;
    this.abi = entity.abi;
  }
}
