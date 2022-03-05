import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { AddressesSortFieldEnum } from './addresses.sort-field.enum';

@InputType()
export class AddressesSortInput extends SortFieldInput {
  @Field((type) => AddressesSortFieldEnum)
  field: AddressesSortFieldEnum;
}
