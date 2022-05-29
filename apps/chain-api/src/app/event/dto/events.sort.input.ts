import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { EventsSortFieldEnum } from '.';

@InputType()
export class EventsSortInput extends SortFieldInput {
  @Field(() => EventsSortFieldEnum)
  field: EventsSortFieldEnum;
}
