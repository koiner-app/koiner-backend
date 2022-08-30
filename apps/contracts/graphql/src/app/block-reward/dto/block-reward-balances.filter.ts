import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class BlockRewardBalancesFilter implements FilterType {
  @Field(() => StringFilterInput, { nullable: true })
  search?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  addressId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  balance?: NumericFilterInput;

  @Field(() => [BlockRewardBalancesFilter], {
    nullable: true,
  })
  AND?: BlockRewardBalancesFilter[];

  @Field(() => [BlockRewardBalancesFilter], {
    nullable: true,
  })
  OR?: BlockRewardBalancesFilter[];
}
