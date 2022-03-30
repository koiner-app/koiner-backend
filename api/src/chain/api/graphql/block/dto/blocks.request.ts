import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/search';
import { SearchRequestArgs } from '@appvise/graphql';
import { BlocksSortInput } from '@koiner/chain/api/graphql/block/dto/blocks.sort.input';
import { BlocksSortFieldEnum } from '@koiner/chain/api/graphql/block/dto/blocks.sort-field.enum';
import { BlocksFilter } from '@koiner/chain/api/graphql/block/dto/blocks.filter';

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
