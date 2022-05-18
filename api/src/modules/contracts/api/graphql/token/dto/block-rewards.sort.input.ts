import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { BlockRewardsSortFieldEnum } from '.';

@InputType()
export class BlockRewardsSortInput extends SortFieldInput {
  @Field(() => BlockRewardsSortFieldEnum)
  field: BlockRewardsSortFieldEnum;
}
