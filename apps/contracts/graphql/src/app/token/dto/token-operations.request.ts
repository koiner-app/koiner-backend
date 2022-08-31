import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { TokenOperationsFilter, TokenOperationsSortInput } from '.';
import { TokenOperationsSortFieldEnum } from './token-operations.sort-field.enum';

@ArgsType()
export class TokenOperationsRequest extends SearchRequestArgs {
  @Field(() => TokenOperationsFilter, { nullable: true })
  filter?: TokenOperationsFilter;

  @Optional()
  @Field(() => [TokenOperationsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: TokenOperationsSortFieldEnum.timestamp,
        direction: SortDirection.desc,
      } as TokenOperationsSortInput,
    ],
  })
  sort?: TokenOperationsSortInput[];
}
