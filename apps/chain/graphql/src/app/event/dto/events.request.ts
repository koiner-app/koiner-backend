import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { EventsFilter, EventsSortInput } from '.';
import { EventsSortFieldEnum } from './events.sort-field.enum';

@ArgsType()
export class EventsRequest extends SearchRequestArgs {
  @Field(() => EventsFilter, { nullable: true })
  filter?: EventsFilter;

  @Optional()
  @Field(() => [EventsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: EventsSortFieldEnum.timestamp,
        direction: SortDirection.desc,
      } as EventsSortInput,
    ],
  })
  sort?: EventsSortInput[];
}
