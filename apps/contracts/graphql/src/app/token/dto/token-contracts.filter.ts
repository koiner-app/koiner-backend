import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class TokenContractsFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  name?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  symbol?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  totalSupply?: NumericFilterInput;

  @Field(() => [TokenContractsFilter], {
    nullable: true,
  })
  AND?: TokenContractsFilter[];

  @Field(() => [TokenContractsFilter], {
    nullable: true,
  })
  OR?: TokenContractsFilter[];
}
