import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/search';
import { SearchRequestArgs } from '@appvise/graphql';
import { Krc20ContractsSortInput } from './krc20-contracts.sort.input';
import { Krc20ContractsSortFieldEnum } from './krc20-contracts.sort-field.enum';
import { Krc20ContractsFilter } from './krc20-contracts.filter';

@ArgsType()
export class Krc20ContractsRequest extends SearchRequestArgs {
  @Field((type) => Krc20ContractsFilter, { nullable: true })
  filter?: Krc20ContractsFilter;

  @Optional()
  @Field((type) => [Krc20ContractsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: Krc20ContractsSortFieldEnum.blockHeight,
        direction: SortDirection.desc,
      } as Krc20ContractsSortInput,
    ],
  })
  sort?: Krc20ContractsSortInput[];
}
