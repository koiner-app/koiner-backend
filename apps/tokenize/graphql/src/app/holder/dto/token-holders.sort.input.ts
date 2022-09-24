import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { TokenHoldersSortFieldEnum } from '.';

@InputType()
export class TokenHoldersSortInput extends SortFieldInput {
  @Field(() => TokenHoldersSortFieldEnum)
  field: TokenHoldersSortFieldEnum;
}
