import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { OperationsFilter, OperationsSortInput } from '.';
import { OperationsSortFieldEnum } from './operations.sort-field.enum';

@ArgsType()
export class OperationsRequest extends SearchRequestArgs {
  @Field(() => OperationsFilter, { nullable: true })
  filter?: OperationsFilter;

  @Optional()
  @Field(() => [OperationsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: OperationsSortFieldEnum.timestamp,
        direction: SortDirection.desc,
      } as OperationsSortInput,
    ],
  })
  sort?: OperationsSortInput[];
}
