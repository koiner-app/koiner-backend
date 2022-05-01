import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { TokenOperationsSortFieldEnum } from './token-operations.sort-field.enum';

@InputType()
export class TokenOperationsSortInput extends SortFieldInput {
  @Field(() => TokenOperationsSortFieldEnum)
  field: TokenOperationsSortFieldEnum;
}
