import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { TokenBalancesSortFieldEnum } from '.';

@InputType()
export class TokenBalancesSortInput extends SortFieldInput {
  @Field(() => TokenBalancesSortFieldEnum)
  field: TokenBalancesSortFieldEnum;
}
