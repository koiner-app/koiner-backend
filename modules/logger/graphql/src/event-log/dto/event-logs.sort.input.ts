import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { EventLogsSortFieldEnum } from '.';

@InputType()
export class EventLogsSortInput extends SortFieldInput {
  @Field(() => EventLogsSortFieldEnum)
  field!: EventLogsSortFieldEnum;
}
