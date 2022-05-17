import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { TokenContractsSortFieldEnum } from '.';

@InputType()
export class TokenContractsSortInput extends SortFieldInput {
  @Field(() => TokenContractsSortFieldEnum)
  field: TokenContractsSortFieldEnum;
}
