import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { ContractOperationsFilter, ContractOperationsSortInput } from '.';
import { ContractOperationsSortFieldEnum } from './contract-operations.sort-field.enum';

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
