import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from '@appvise/domain';

@InputType('DateTimeFilter')
export class DateTimeFilterInput implements DateTimeFilter {
  @Field({
    nullable: true,
  })
  equals?: Date;

  @Field({
    nullable: true,
  })
  lt?: Date;

  @Field({
    nullable: true,
  })
  lte?: Date;

  @Field({
    nullable: true,
  })
  gt?: Date;

  @Field({
    nullable: true,
  })
  gte?: Date;
}
