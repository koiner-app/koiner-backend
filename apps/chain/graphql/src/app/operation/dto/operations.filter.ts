import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class OperationsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  blockHeight?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  transactionId?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  operationIndex?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  type?: StringFilterInput;

  @Field(() => [OperationsFilter], {
    nullable: true,
  })
  AND?: OperationsFilter[];

  @Field(() => [OperationsFilter], {
    nullable: true,
  })
  OR?: OperationsFilter[];
}
