import { Field, ObjectType } from '@nestjs/graphql';
import { TokenOperation, ContractStandardType } from '@koiner/contracts/domain';
import { BaseNode } from '@appvise/graphql';

@ObjectType('TokenOperation')
export class TokenOperationNode extends BaseNode {
  @Field()
  operation: string;

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

    this.operation = entity.name;
    this.from = entity.from ? entity.from.value : undefined;
    this.to = entity.to.value;
    this.value = entity.value;
  }
}
