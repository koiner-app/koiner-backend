import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/search';
import { SearchRequestArgs } from '@appvise/graphql';
import { Krc20OperationsSortInput } from './krc20-operations.sort.input';
import { Krc20OperationsSortFieldEnum } from './krc20-operations.sort-field.enum';
import { Krc20OperationsFilter } from './krc20-operations.filter';

@ArgsType()
export class Krc20OperationsRequest extends SearchRequestArgs {
  @Field(() => Krc20OperationsFilter, { nullable: true })
  filter?: Krc20OperationsFilter;

  @Optional()
  @Field(() => [Krc20OperationsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: Krc20OperationsSortFieldEnum.createdAt,
        direction: SortDirection.desc,
      } as Krc20OperationsSortInput,
    ],
  })
  sort?: Krc20OperationsSortInput[];
}
