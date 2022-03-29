import { Field, ObjectType } from '@nestjs/graphql';
import { Krc20Operation, ContractStandardType } from '@koiner/contracts/domain';
import { BaseNode } from '@appvise/graphql';

@ObjectType('Krc20Operation')
export class Krc20OperationNode extends BaseNode {
  @Field()
  operation: string;

  @Field({ nullable: true })
  from?: string;

  @Field()
  to: string;

  @Field()
  value: string;

  // Used by UnionTypeResolver
  contractStandardType: ContractStandardType = ContractStandardType.krc20;

  constructor(entity: Krc20Operation) {
    super(entity);

    this.operation = entity.name;
    this.from = entity.from ? entity.from.value : undefined;
    this.to = entity.from.value;
    this.value = entity.value;
  }
}
