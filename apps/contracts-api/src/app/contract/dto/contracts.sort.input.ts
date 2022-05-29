import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { ContractsSortFieldEnum } from '.';

@InputType()
export class ContractsSortInput extends SortFieldInput {
  @Field(() => ContractsSortFieldEnum)
  field: ContractsSortFieldEnum;
}
