import { Field, InputType } from '@nestjs/graphql';
import { NumericFilter } from '@appvise/domain';

@InputType('NumericFilter')
export class NumericFilterInput implements NumericFilter {
  @Field(() => Number, {
    nullable: true,
  })
  equals?: number;

  @Field(() => Number, {
    nullable: true,
  })
  lt?: number;

  @Field(() => Number, {
    nullable: true,
  })
  lte?: number;

  @Field(() => Number, {
    nullable: true,
  })
  gt?: number;

  @Field(() => Number, {
    nullable: true,
  })
  gte?: number;
}
