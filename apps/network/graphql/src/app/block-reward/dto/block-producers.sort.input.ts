import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { BlockProducersSortFieldEnum } from '.';

@InputType()
export class BlockProducersSortInput extends SortFieldInput {
  @Field(() => BlockProducersSortFieldEnum)
  field: BlockProducersSortFieldEnum;
}
