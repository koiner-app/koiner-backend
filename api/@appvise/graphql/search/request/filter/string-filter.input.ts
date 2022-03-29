import { Field, InputType } from '@nestjs/graphql';
import { StringFilter } from '@appvise/search';

@InputType('StringFilter')
export class StringFilterInput implements StringFilter {
  @Field(() => String, {
    nullable: true,
  })
  equals?: string;

  @Field(() => String, {
    nullable: true,
  })
  contains?: string;
}
