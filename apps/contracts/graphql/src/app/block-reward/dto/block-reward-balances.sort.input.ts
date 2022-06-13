import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { BlockRewardBalancesSortFieldEnum } from '.';

@InputType()
export class BlockRewardBalancesSortInput extends SortFieldInput {
  @Field(() => BlockRewardBalancesSortFieldEnum)
  field: BlockRewardBalancesSortFieldEnum;
}
