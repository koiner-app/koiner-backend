import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { ContractsFilter, ContractsSortInput } from '.';
import { ContractsSortFieldEnum } from './contracts.sort-field.enum';

@ArgsType()
export class ContractsRequest extends SearchRequestArgs {
  @Field(() => ContractsFilter, { nullable: true })
  filter?: ContractsFilter;

  @Optional()
  @Field(() => [ContractsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: ContractsSortFieldEnum.createdAt,
        direction: SortDirection.desc,
      } as ContractsSortInput,
    ],
  })
  sort?: ContractsSortInput[];
}
