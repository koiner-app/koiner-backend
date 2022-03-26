import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/search';
import { SearchRequestArgs } from '@appvise/graphql';
import { OperationsSortInput } from './operations.sort.input';
import { OperationsSortFieldEnum } from './operations.sort-field.enum';
import { OperationsFilter } from './operations.filter';

@ArgsType()
export class OperationsRequest extends SearchRequestArgs {
  @Field(() => OperationsFilter, { nullable: true })
  filter?: OperationsFilter;

  @Optional()
  @Field(() => [OperationsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: OperationsSortFieldEnum.createdAt,
        direction: SortDirection.desc,
      } as OperationsSortInput,
    ],
  })
  sort?: OperationsSortInput[];
}
