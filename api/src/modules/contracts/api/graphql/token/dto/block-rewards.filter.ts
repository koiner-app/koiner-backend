import { Field, InputType } from '@nestjs/graphql';
import { FilterType } from '@appvise/domain';
import { NumericFilterInput, StringFilterInput } from '@appvise/graphql';

@InputType()
export class BlockRewardsFilter implements FilterType {
  @Field(() => NumericFilterInput, { nullable: true })
  blockHeight?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  producerId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  contractId?: StringFilterInput;

  @Field(() => [BlockRewardsFilter], {
    nullable: true,
  })
  AND?: BlockRewardsFilter[];

  @Field(() => [BlockRewardsFilter], {
    nullable: true,
  })
  OR?: BlockRewardsFilter[];
}
