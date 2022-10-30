import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class EventLogsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  eventName?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  itemId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  itemType?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  timestamp?: NumericFilterInput;

  @Field(() => [EventLogsFilter], {
    nullable: true,
  })
  AND?: EventLogsFilter[];

  @Field(() => [EventLogsFilter], {
    nullable: true,
  })
  OR?: EventLogsFilter[];
}
