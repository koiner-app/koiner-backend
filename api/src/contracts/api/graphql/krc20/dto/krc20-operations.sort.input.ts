import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { Krc20OperationsSortFieldEnum } from './krc20-operations.sort-field.enum';

@InputType()
export class Krc20OperationsSortInput extends SortFieldInput {
  @Field(() => Krc20OperationsSortFieldEnum)
  field: Krc20OperationsSortFieldEnum;
}
