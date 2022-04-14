import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo as PageInfoInterface } from '@appvise/domain';

@ObjectType()
export class PageInfo implements PageInfoInterface {
  @Field()
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  startCursor?: string;

  @Field()
  hasNextPage: boolean;

  @Field({ nullable: true })
  endCursor?: string;

  constructor(
    hasPreviousPage: boolean,
    hasNextPage: boolean,
    startCursor?: string,
    endCursor?: string,
  ) {
    this.hasPreviousPage = hasPreviousPage;
    this.hasNextPage = hasNextPage;
    this.startCursor = startCursor;
    this.endCursor = endCursor;
  }
}
