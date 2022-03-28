import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/search';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class TransactionsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  blockHeight?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  rcLimit?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  nonce?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  payer?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  transactionIndex?: NumericFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  operationCount?: NumericFilterInput;

  @Field(() => [TransactionsFilter], {
    nullable: true,
  })
  AND?: TransactionsFilter[];

  @Field(() => [TransactionsFilter], {
    nullable: true,
  })
  OR?: TransactionsFilter[];
}
