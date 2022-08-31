import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class EventsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  parentId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  parentType?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  sequence?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  name?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  impacted?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  timestamp?: NumericFilterInput;

  @Field(() => [EventsFilter], {
    nullable: true,
  })
  AND?: EventsFilter[];

  @Field(() => [EventsFilter], {
    nullable: true,
  })
  OR?: EventsFilter[];
}
