import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { ContractOperationsSortFieldEnum } from './contract-operations.sort-field.enum';

@InputType()
export class ContractOperationsSortInput extends SortFieldInput {
  @Field(() => ContractOperationsSortFieldEnum)
  field: ContractOperationsSortFieldEnum;
}
