import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { Krc20ContractsSortFieldEnum } from './krc20-contracts.sort-field.enum';

@InputType()
export class Krc20ContractsSortInput extends SortFieldInput {
  @Field(() => Krc20ContractsSortFieldEnum)
  field: Krc20ContractsSortFieldEnum;
}
