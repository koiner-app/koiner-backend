import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/search';
import { SearchRequestArgs } from '@appvise/graphql';
import { AddressesSortInput } from './addresses.sort.input';
import { AddressesSortFieldEnum } from './addresses.sort-field.enum';
import { AddressesFilter } from './addresses.filter';

@ArgsType()
export class AddressesRequest extends SearchRequestArgs {
  @Field(() => AddressesFilter, { nullable: true })
  filter?: AddressesFilter;

  @Optional()
  @Field(() => [AddressesSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: AddressesSortFieldEnum.createdAt,
        direction: SortDirection.desc,
      } as AddressesSortInput,
    ],
  })
  sort?: AddressesSortInput[];
}
