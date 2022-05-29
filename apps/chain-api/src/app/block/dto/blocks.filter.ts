import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class BlocksFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  id?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  height?: NumericFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  timestamp?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  signer?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  transactionCount?: NumericFilterInput;

  @Field(() => [BlocksFilter], {
    nullable: true,
  })
  AND?: BlocksFilter[];

  @Field(() => [BlocksFilter], {
    nullable: true,
  })
  OR?: BlocksFilter[];
}
