import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { BlocksSortFieldEnum } from '.';

@InputType()
export class BlocksSortInput extends SortFieldInput {
  @Field(() => BlocksSortFieldEnum)
  field: BlocksSortFieldEnum;
}
