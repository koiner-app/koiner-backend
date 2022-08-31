import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { BlockProducersFilter, BlockProducersSortInput } from '.';
import { BlockProducersSortFieldEnum } from './block-producers.sort-field.enum';

@ArgsType()
export class BlockProducersRequest extends SearchRequestArgs {
  @Field(() => BlockProducersFilter, { nullable: true })
  filter?: BlockProducersFilter;

  @Optional()
  @Field(() => [BlockProducersSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: BlockProducersSortFieldEnum.balance,
        direction: SortDirection.desc,
      } as BlockProducersSortInput,
    ],
  })
  sort?: BlockProducersSortInput[];
}
