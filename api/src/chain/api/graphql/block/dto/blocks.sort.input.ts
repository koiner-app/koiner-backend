import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { BlocksSortFieldEnum } from '@koiner/chain/api/graphql/block/dto/blocks.sort-field.enum';

@InputType()
export class BlocksSortInput extends SortFieldInput {
  @Field((type) => BlocksSortFieldEnum)
  field: BlocksSortFieldEnum;
}
