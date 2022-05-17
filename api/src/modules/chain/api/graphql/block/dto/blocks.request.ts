import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { BlocksFilter, BlocksSortInput } from '.';
import { BlocksSortFieldEnum } from './blocks.sort-field.enum';

@ArgsType()
export class BlocksRequest extends SearchRequestArgs {
  @Field(() => BlocksFilter, { nullable: true })
  filter?: BlocksFilter;

  @Optional()
  @Field(() => [BlocksSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: BlocksSortFieldEnum.height,
        direction: SortDirection.desc,
      } as BlocksSortInput,
    ],
  })
  sort?: BlocksSortInput[];
}
