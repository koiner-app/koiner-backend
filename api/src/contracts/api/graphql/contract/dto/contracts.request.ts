import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/search';
import { SearchRequestArgs } from '@appvise/graphql';
import { ContractsSortInput } from './contracts.sort.input';
import { ContractsSortFieldEnum } from './contracts.sort-field.enum';
import { ContractsFilter } from './contracts.filter';

@ArgsType()
export class ContractsRequest extends SearchRequestArgs {
  @Field(() => ContractsFilter, { nullable: true })
  filter?: ContractsFilter;

  @Optional()
  @Field(() => [ContractsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: ContractsSortFieldEnum.blockHeight,
        direction: SortDirection.desc,
      } as ContractsSortInput,
    ],
  })
  sort?: ContractsSortInput[];
}
