import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { BlockRewardBalancesFilter, BlockRewardBalancesSortInput } from '.';
import { BlockRewardBalancesSortFieldEnum } from './block-reward-balances.sort-field.enum';

@ArgsType()
export class BlockRewardBalancesRequest extends SearchRequestArgs {
  @Field(() => BlockRewardBalancesFilter, { nullable: true })
  filter?: BlockRewardBalancesFilter;

  @Optional()
  @Field(() => [BlockRewardBalancesSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: BlockRewardBalancesSortFieldEnum.balance,
        direction: SortDirection.desc,
      } as BlockRewardBalancesSortInput,
    ],
  })
  sort?: BlockRewardBalancesSortInput[];
}
