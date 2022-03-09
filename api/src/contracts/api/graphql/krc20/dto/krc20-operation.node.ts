import { Field, ObjectType } from '@nestjs/graphql';
import { Krc20Operation } from '@koiner/contracts/domain';
import { BaseNode } from '@appvise/graphql';
import { OperationType } from '@koiner/chain/domain';

@ObjectType('Krc20Operation')
export class Krc20OperationNode extends BaseNode {
  @Field()
  operation: string;

  @Field()
  from: string;

  @Field()
  to: string;

  @Field()
  value: string;

  // Used by UnionTypeResolver
  type: OperationType = OperationType.krc20Operation;

  constructor(entity: Krc20Operation) {
    super(entity);

    this.operation = entity.name;
    this.from = entity.from.value;
    this.to = entity.from.value;
    this.value = entity.value;
  }
}
