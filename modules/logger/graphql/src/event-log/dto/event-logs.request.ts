import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { EventLogsFilter, EventLogsSortInput } from '.';
import { EventLogsSortFieldEnum } from './event-logs.sort-field.enum';

@ArgsType()
export class EventLogsRequest extends SearchRequestArgs {
  @Field(() => EventLogsFilter, { nullable: true })
  filter?: EventLogsFilter;

  @Optional()
  @Field(() => [EventLogsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: EventLogsSortFieldEnum.timestamp,
        direction: SortDirection.desc,
      } as EventLogsSortInput,
    ],
  })
  sort?: EventLogsSortInput[];
}
