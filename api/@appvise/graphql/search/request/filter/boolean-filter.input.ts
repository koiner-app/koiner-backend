import { Field, InputType } from '@nestjs/graphql';
import { BooleanFilter } from '@appvise/search';

@InputType('BooleanFilter')
export class BooleanFilterInput implements BooleanFilter {
  @Field((type) => Boolean, {
    nullable: true,
  })
  equals?: boolean;
}
