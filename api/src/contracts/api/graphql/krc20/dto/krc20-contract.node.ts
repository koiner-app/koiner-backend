import { Field, ObjectType } from '@nestjs/graphql';
import { Krc20Contract } from '@koiner/contracts/domain';
import { BaseNode } from '@appvise/graphql';

@ObjectType('Krc20Contract')
export class Krc20ContractNode extends BaseNode {
  @Field()
  blockHeight: number;

  @Field()
  transactionId: string;

  @Field()
  operationIndex: number;

  @Field()
  name: string;

  @Field()
  symbol: string;

  @Field()
  decimals: number;

  constructor(entity: Krc20Contract) {
    super(entity);

    this.blockHeight = entity.blockHeight;
    this.transactionId = entity.transactionId.value;
    this.operationIndex = entity.operationIndex;
    this.name = entity.name;
    this.symbol = entity.symbol;
    this.decimals = entity.decimals;
  }
}
