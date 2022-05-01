import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { ContractOperationsSortInput } from './contract-operations.sort.input';
import { ContractOperationsSortFieldEnum } from './contract-operations.sort-field.enum';
import { ContractOperationsFilter } from './contract-operations.filter';

@ArgsType()
export class ContractOperationsRequest extends SearchRequestArgs {
  @Field(() => ContractOperationsFilter, { nullable: true })
  filter?: ContractOperationsFilter;

  @Optional()
  @Field(() => [ContractOperationsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: ContractOperationsSortFieldEnum.createdAt,
        direction: SortDirection.desc,
      } as ContractOperationsSortInput,
    ],
  })
  sort?: ContractOperationsSortInput[];
}
