import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { TransactionsSortFieldEnum } from '.';

@InputType()
export class TransactionsSortInput extends SortFieldInput {
  @Field(() => TransactionsSortFieldEnum)
  field: TransactionsSortFieldEnum;
}
