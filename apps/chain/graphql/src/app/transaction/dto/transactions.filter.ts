import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class TransactionsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  blockHeight?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  payer?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  operationCount?: NumericFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  timestamp?: NumericFilterInput;

  @Field(() => [TransactionsFilter], {
    nullable: true,
  })
  AND?: TransactionsFilter[];

  @Field(() => [TransactionsFilter], {
    nullable: true,
  })
  OR?: TransactionsFilter[];
}
