import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { ContractOperationsSortFieldEnum } from '.';

@InputType()
export class ContractOperationsSortInput extends SortFieldInput {
  @Field(() => ContractOperationsSortFieldEnum)
  field: ContractOperationsSortFieldEnum;
}
