import { Field, InputType } from '@nestjs/graphql';
import { SortFieldInput } from '@appvise/graphql';
import { TransactionsSortFieldEnum } from '@koiner/chain/api/graphql/transaction/dto/transactions.sort-field.enum';

@InputType()
export class TransactionsSortInput extends SortFieldInput {
  @Field((type) => TransactionsSortFieldEnum)
  field: TransactionsSortFieldEnum;
}
