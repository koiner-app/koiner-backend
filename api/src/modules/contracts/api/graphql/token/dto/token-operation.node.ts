import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { TokenOperation, ContractStandardType } from '@koiner/contracts/domain';

@ObjectType('TokenOperation')
export class TokenOperationNode extends BaseNode {
  @Field()
  transactionId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  from?: string;

  @Field()
  to: string;

  @Field()
  value: number;

  // Used by UnionTypeResolver
  contractStandardType: ContractStandardType = ContractStandardType.token;

  constructor(entity: TokenOperation) {
    super(entity);

    this.transactionId = entity.transactionId.value;
    this.name = entity.name;
    this.from = entity.from ? entity.from.value : undefined;
    this.to = entity.to.value;
    this.value = entity.value;
  }
}
