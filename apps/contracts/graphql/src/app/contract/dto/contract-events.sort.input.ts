import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { ContractEventsSortFieldEnum } from '.';

@InputType()
export class ContractEventsSortInput extends SortFieldInput {
  @Field(() => ContractEventsSortFieldEnum)
  field: ContractEventsSortFieldEnum;
}
