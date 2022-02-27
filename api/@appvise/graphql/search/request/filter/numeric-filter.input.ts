import { Field, InputType } from '@nestjs/graphql';
import { NumericFilter } from '@appvise/search';

@InputType('NumericFilter')
export class NumericFilterInput implements NumericFilter {
  @Field((type) => Number, {
    nullable: true,
  })
  equals?: number;

  @Field((type) => Number, {
    nullable: true,
  })
  lt?: number;

  @Field((type) => Number, {
    nullable: true,
  })
  lte?: number;

  @Field((type) => Number, {
    nullable: true,
  })
  gt?: number;

  @Field((type) => Number, {
    nullable: true,
  })
  gte?: number;
}
