import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/search';
import { StringFilterInput } from '@appvise/graphql';

@InputType()
export class BlocksFilter implements FilterType {
  @Field((type) => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field((type) => StringFilterInput, { nullable: true })
  height?: StringFilterInput;

  @Field((type) => [BlocksFilter], {
    nullable: true,
  })
  AND?: BlocksFilter[];

  @Field((type) => [BlocksFilter], {
    nullable: true,
  })
  OR?: BlocksFilter[];
}
