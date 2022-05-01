import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { TokenContractsSortFieldEnum } from './token-contracts.sort-field.enum';

@InputType()
export class TokenContractsSortInput extends SortFieldInput {
  @Field(() => TokenContractsSortFieldEnum)
  field: TokenContractsSortFieldEnum;
}
