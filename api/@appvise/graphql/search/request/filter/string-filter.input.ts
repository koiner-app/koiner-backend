import { Field, InputType } from '@nestjs/graphql';
import { StringFilter } from '@appvise/search';

@InputType('StringFilter')
export class StringFilterInput implements StringFilter {
  @Field((type) => String, {
    nullable: true,
  })
  equals?: string;

  @Field((type) => String, {
    nullable: true,
  })
  contains?: string;
}
