import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class TokenOperationsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  blockHeight?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  transactionId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  name?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  from?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  to?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  value?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  timestamp?: NumericFilterInput;

  @Field(() => [TokenOperationsFilter], {
    nullable: true,
  })
  AND?: TokenOperationsFilter[];

  @Field(() => [TokenOperationsFilter], {
    nullable: true,
  })
  OR?: TokenOperationsFilter[];
}
