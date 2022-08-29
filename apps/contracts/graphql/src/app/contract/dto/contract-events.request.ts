import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { ContractEventsFilter, ContractEventsSortInput } from '.';
import { ContractEventsSortFieldEnum } from './contract-events.sort-field.enum';

@ArgsType()
export class ContractEventsRequest extends SearchRequestArgs {
  @Field(() => ContractEventsFilter, { nullable: true })
  filter?: ContractEventsFilter;

  @Optional()
  @Field(() => [ContractEventsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: ContractEventsSortFieldEnum.createdAt,
        direction: SortDirection.desc,
      } as ContractEventsSortInput,
    ],
  })
  sort?: ContractEventsSortInput[];
}
