import { ArgsType, Field } from '@nestjs/graphql';
import { Optional } from '@nestjs/common';
import { SortDirection } from '@appvise/domain';
import { SearchRequestArgs } from '@appvise/graphql';
import { TokenEventsFilter, TokenEventsSortInput } from '.';
import { TokenEventsSortFieldEnum } from './token-events.sort-field.enum';

@ArgsType()
export class TokenEventsRequest extends SearchRequestArgs {
  @Field(() => TokenEventsFilter, { nullable: true })
  filter?: TokenEventsFilter;

  @Optional()
  @Field(() => [TokenEventsSortInput], {
    nullable: true,
    defaultValue: [
      {
        field: TokenEventsSortFieldEnum.timestamp,
        direction: SortDirection.desc,
      } as TokenEventsSortInput,
    ],
  })
  sort?: TokenEventsSortInput[];
}
