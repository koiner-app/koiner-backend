import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { TokenOperationsSortInput } from './token-operations.sort.input';
import { TokenOperationsSortFieldEnum } from './token-operations.sort-field.enum';
import { TokenOperationsFilter } from './token-operations.filter';

@ArgsType()
export class TokenOperationsRequest extends SearchRequestArgs {
  @Field(() => TokenOperationsFilter, { nullable: true })
  filter?: TokenOperationsFilter;

  @Optional()
  @Field(() => [TokenOperationsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: TokenOperationsSortFieldEnum.createdAt,
        direction: SortDirection.desc,
      } as TokenOperationsSortInput,
    ],
  })
  sort?: TokenOperationsSortInput[];
}
