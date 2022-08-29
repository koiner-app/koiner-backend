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

  @Field(() => NumericFilterInput, { nullable: true })
  value?: NumericFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  burnedContractId?: StringFilterInput;

  @Field(() => StringFilterInput, { nullable: true })
  burnerId?: StringFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  burnedValue?: NumericFilterInput;

  @Field(() => NumericFilterInput, { nullable: true })
  roi?: NumericFilterInput;

  @Field(() => [BlockRewardsFilter], {
    nullable: true,
  })
  AND?: BlockRewardsFilter[];

  @Field(() => [BlockRewardsFilter], {
    nullable: true,
  })
  OR?: BlockRewardsFilter[];
}
