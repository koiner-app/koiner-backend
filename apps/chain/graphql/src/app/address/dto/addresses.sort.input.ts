import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { AddressesSortFieldEnum } from '.';

@InputType()
export class AddressesSortInput extends SortFieldInput {
  @Field(() => AddressesSortFieldEnum)
  field: AddressesSortFieldEnum;
}
