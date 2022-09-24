import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { TokenEventsSortFieldEnum } from '.';

@InputType()
export class TokenEventsSortInput extends SortFieldInput {
  @Field(() => TokenEventsSortFieldEnum)
  field: TokenEventsSortFieldEnum;
}
