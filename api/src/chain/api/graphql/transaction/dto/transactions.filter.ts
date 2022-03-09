import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/search';
import { StringFilterInput } from '@appvise/graphql';

@InputType()
export class TransactionsFilter implements FilterType {
  @Field((type) => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field((type) => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field((type) => StringFilterInput, { nullable: true })
  blockHeight?: StringFilterInput;

  @Field((type) => StringFilterInput, { nullable: true })
  payer?: StringFilterInput;

  @Field((type) => [TransactionsFilter], {
    nullable: true,
  })
  AND?: TransactionsFilter[];

  @Field((type) => [TransactionsFilter], {
    nullable: true,
  })
  OR?: TransactionsFilter[];
}
