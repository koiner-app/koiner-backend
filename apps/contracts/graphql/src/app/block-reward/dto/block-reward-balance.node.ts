import { Field, ObjectType } from '@nestjs/graphql';
import { BaseNode } from '@appvise/graphql';
import { BlockRewardBalance } from '@koiner/contracts/domain';

@ObjectType('BlockRewardBalance')
export class BlockRewardBalanceNode extends BaseNode {
  @Field()
  addressId: string;

  @Field()
  contractId: string;

  @Field()
  balance: number;

  constructor(blockRewardBalance: BlockRewardBalance) {
    super(blockRewardBalance);

    this.addressId = blockRewardBalance.addressId.value;
    this.contractId = blockRewardBalance.contractId.value;
    this.balance = blockRewardBalance.balance;
  }
}
