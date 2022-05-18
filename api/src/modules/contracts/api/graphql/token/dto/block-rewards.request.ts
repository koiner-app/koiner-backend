import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { BlockRewardsFilter, BlockRewardsSortInput } from '.';
import { BlockRewardsSortFieldEnum } from './block-rewards.sort-field.enum';

@ArgsType()
export class BlockRewardsRequest extends SearchRequestArgs {
  @Field(() => BlockRewardsFilter, { nullable: true })
  filter?: BlockRewardsFilter;

  @Optional()
  @Field(() => [BlockRewardsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: BlockRewardsSortFieldEnum.blockHeight,
        direction: SortDirection.desc,
      } as BlockRewardsSortInput,
    ],
  })
  sort?: BlockRewardsSortInput[];
}
