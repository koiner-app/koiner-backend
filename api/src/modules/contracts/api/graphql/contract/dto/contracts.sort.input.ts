import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { ContractsSortFieldEnum } from './contracts.sort-field.enum';

@InputType()
export class ContractsSortInput extends SortFieldInput {
  @Field(() => ContractsSortFieldEnum)
  field: ContractsSortFieldEnum;
}
