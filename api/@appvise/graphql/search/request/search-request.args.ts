import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';
import { FilterType, SearchRequest, SortField } from '@appvise/domain';

@ArgsType()
export abstract class SearchRequestArgs implements SearchRequest {
  @Field(() => Int)
  @Min(1)
  @Max(1000)
  first = 30;

  @Field({ nullable: true })
  before?: string;

  @Field({ nullable: true })
  after?: string;

  abstract filter?: FilterType;
  abstract sort?: SortField[];
}
